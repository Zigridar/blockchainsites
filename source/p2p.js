'use strict'

const utils = require('./utils.js')
const io = require('socket.io-client');
const Peer = require('simple-peer');

const url = 'https://desolate-brook-88028.herokuapp.com';

(async () => {
  let status = await utils.isFullNode();

if(status) {
  console.log('I`m full');
  //initiate for full
  const socket = io.connect(url, {
    reconnect: true
  });

  let connections = [];

  socket.emit('full-node');

  //connect new peer
  socket.on('offer', (offer) => {
    const peer = new FullPeer(offer);
    //all settings for peer
    peer.peer.on('data', async (url) => {
      url = url.toString();
      const ret = await utils.GetPageFromBlockchain(url.substr(7), 'tBTC');
      url = "data:text/html;base64," + ret;
      peer.peer.send(url);
    });

    connections.push(peer);
  });

  setInterval(checkConnectionsFull, 500);

  ////////////////////////////////////////
  //full-node constructor
  function FullPeer(offer) {
    const connection = this;

    connection.peer = new Peer({
      initiator: false,
      trickle: false
    });

    connection.peer.signal(JSON.parse(offer));

    connection.peer.on('signal', (answer) => {
      socket.emit('answer-full', JSON.stringify(answer));
    });
  }
  //check connections for full-node
  function checkConnectionsFull() {
    connections.forEach((item, i) => {
      let status;
      try {
        status = item.peer._pc.connectionState;
      } catch (e) {
        status = 'failed';
      }
      console.log(connections);

      if(status == 'failed' || status == 'disconnected' || status == 'closed') {
        item.peer.destroy();
        connections.splice(i, 1);
      }
    });
  }
  /////////////////////////////////////////////
}
else {
  console.log('I`m light');
  //initiate for light node
  let connection = new LightPeer();
  setInterval(checkConnectionsLight, 500);

  //////////////////////////////////////////////
  //no-node constructor
  function LightPeer() {
    const connection = this;

    const socket = io.connect(url, {
      reconnect: false
    });

    connection.peer = new Peer({
      initiator: true,
      trickle: false
    });

    connection.peer.on('signal', (offer) => {
      socket.emit('no-node', JSON.stringify(offer));
    });

    socket.on('answer', (answer) => {
      connection.peer.signal(JSON.parse(answer));
    });
  }

  //check connections for no-node
  function checkConnectionsLight() {
    let status;

    try {
      status = connection.peer._pc.connectionState;
    } catch (e) {
      status = 'failed';
    }
    console.log('no-node ' + status);

    if(status == 'failed' || status == 'disconnected' || status == 'closed') {
      connection.peer.destroy();
      connection = new LightPeer();
    }
  }
  exports.getSrc = function(url) {
    return new Promise(ok => {
      connection.peer.send(url);
      connection.peer.on('data', page => {
        ok(page);
      });
    });
  }
  //////////////////////////////////////////////
}
})()
