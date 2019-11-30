'use strict';

const utils = require("./utils");
const io = require('socket.io-client');
const blockchaindata = require('blockchaindata-lib');
const $ = require('jquery');
const Peer = require('simple-peer');
const ipcRender = electron.ipcRenderer;

const url = 'http://144.76.71.116:3000/';

(async () => {
  let status = await utils.nodeStatus();

  let getSrc;

  if(status.blockchain && !status.pruned) {
    const p2p = require('./p2p.js');

    getSrc = function(url) {
      return new Promise(async ok => {
        const ret = await blockchaindata.GetObjectFromBlockchain(url.substr(7));
        url = "data:text/html;base64," + ret.base64;
        ok(url);
      });
    }

    $('#mode_status').html('Node status: full-node');
    $('#statusbar').css('display', 'block');
  }
  else {
    console.log('I`m low');


    if(!status.blockchain) {
      $('#constructorTab').remove();
      $('#itemConstructor').remove();
      $('#mode_status').html('Node status: no-node');
      $('#mode_status').removeClass('badge-primary');
      $('#mode_status').addClass('badge-danger');

      $('#showtoolstab').attr('disabled', '');
      $('#showtoolslabel').append('(disabled for no-node)');
    }
    else {
      $('#mode_status').html('Node status: pruned-node');
      $('#mode_status').removeClass('badge-primary');
      $('#mode_status').addClass('badge-warning');
    }

    $('#statusbar').css('display', 'block');
    //connect to full-node
    connectionToFull();

    $('#peer_status').addClass('badge-danger');
    $('#peer_status').html('No connection to socket-server');

    //connection constructor
    function connectionToFull() {

      const socket = io.connect(url, {
        reconnect: false
      });

      const lowNode = new Peer({
        initiator: true,
        trickle: false
      });

      socket
        .on('connect', () => {
          console.log('Connected to socket-server');
          $('#peer_status').removeClass('badge-primary');
          $('#peer_status').removeClass('badge-danger');
          $('#peer_status').addClass('badge-warning');
          $('#peer_status').html('Connected to socket-server');
        })
        .on('answer', answer => {
          lowNode.signal(answer);
          console.log('answer has been received');
          socket.disconnect();

          $('#peer_status').html('host connection: connected');
          $('#peer_status').addClass('badge-primary');
          $('#peer_status').removeClass('badge-warning');
          $('#peer_status').removeClass('badge-danger');
        })
        .on('disconnect', () => {
          console.log('Disconnected from socket-server');
          $('#peer_status').removeClass('badge-primary');
          $('#peer_status').removeClass('badge-danger');
          $('#peer_status').addClass('badge-warning');
          $('#peer_status').html('Disconnected from socket-server');
          setTimeout(() => {
            if(lowNode._pc.connectionState != 'connected') {
              lowNode.destroy();

              connectionToFull();
              browser.getSrc = getSrc;
              console.log('reconnect');
            }
          }, 10000);
        });

      lowNode._pc.onconnectionstatechange = function ()
      {
        console.log('onconnectionstatechange:' + lowNode._pc.connectionState);
        if(lowNode._pc.connectionState == 'closed' || lowNode._pc.connectionState == 'disconnected' || lowNode._pc.connectionState == 'failed') {
          $('#peer_status').removeClass('badge-warning');
          $('#peer_status').removeClass('badge-primary');
          $('#peer_status').addClass('badge-danger');
          $('#peer_status').html('host disconnected');

          connectionToFull();
          console.log('reconnect');
          browser.getSrc = getSrc;
        }
      };

      lowNode.on('signal', offer => {
        socket.emit('offer', offer);
        console.log('offer has been sent '+JSON.stringify(offer));
      });

        getSrc = async function(url) {
        return new Promise(ok => {
            if(lowNode._pc.connectionState == 'connected') {
              lowNode._channel.send(url);
              lowNode._channel.onmessage = e => {
                ok(e.data);
              }
            }
        });
      }

      return;
    }
  }

  const browser = new navigation({
    defaultFavicons: true,
    getSrc: getSrc,
  });

  $(document).ready(function() {
    ipcRender.send('page-loaded');
    $('#spinner').css('display', 'none');
    $('#fullpage').css('display', 'block');
    $('.navbar').css('display', 'block');
  });

  ipcRender.on('oldBookmarks', (event, oldBookmarks) => {
    browser.bookmarks = oldBookmarks;
  });

  ipcRender.on('getJsonBookmarks', () => {
    const json = browser.getBookmarks();
    ipcRender.send('JsonBookmarks', JSON.stringify(json));
  });

})()
