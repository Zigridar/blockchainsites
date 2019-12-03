'use strict'

// const {ipcRender} = electron;
const ipcRender = electron.ipcRenderer;
const utils = require('./utils.js');
const blockchaindata = require('blockchaindata-lib');
const Swal = require('sweetalert2');

$(document).ready(function() {

  //Creating codeeditor
  $('#codeeditor').summernote({
    toolbar: [
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['strikethrough', 'superscript', 'subscript']],
      ['fontsize', ['fontname', 'fontsize']],
      ['color', ['color', 'bac']],
      ['para', ['ul', 'ol', 'style', 'paragraph']],
      ['height', ['height']],
      ['insert', ['picture', 'link', 'table', 'hr']],
      ['view', ['fullscreen', 'codeview']]
    ],
    fontNames: [
      'Arial',
      'Courier New',
    ],
    minHeight: 150,
    height: 200,
    focus: true,
    callbacks: {
      onChange: change
    },
    codemirror: {
      mode: "text/html",
      lineNumbers: true,
      matchBrackets: true,
      theme: "eclipse",
      extraKeys: {"Ctrl-Space": "autocomplete"},
      autocorrect: true,
      spellcheck: true
  }
  });

  async function change() {
    let data = $('#codeeditor').summernote('code');
    data = await utils.trimHTML(data);
    $('#pageSize').html(Math.ceil(data.length / 2));
  }

  //Button for creating new page
  $('#createBtn').click((event) => {
    event.preventDefault();
    $('.constructorQuestion').css('display', 'none');
    $('#constructor-table').css('display', 'block');
    $('#codContainer').show();
    $('#constructorTable').show();
  });

  //Button for editing existing page
  $('.openBtn').click((event) => {
    event.preventDefault();
    $('.constructorQuestion').css('display', 'none');
    $('#constructor-table').css('display', 'block');
    $('#codContainer').show();
    $('#constructorTable').show();
    //Code for opening htmlfile
    ipcRender.send('openBtn');
  });

  //Button for local saving page
  $('#saveBtn').click((event) => {
    event.preventDefault();
    ipcRender.send('saveBtn', $('#codeeditor').summernote('code'));
  });

  //Communication to main process
  ipcRender.on('openReply', async (event, html) => {
    $('#codeeditor').summernote('code', html);
  });

  //Button for loading the page to Blockchain
  $('#loadBtn').click(async (e) => {
    e.preventDefault();
    const pageData = $('#codeeditor').summernote('code');
    if(pageData) {
      //alert
      Swal.fire({
        title: 'Do you realy want to save this page to Blockchain?',
        icon: 'question',
        confirmButtonText: 'Cool',
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        focusConfirm: true,
        focusCancel: false,
        heightAuto: false,
        scrollbarPadding: false,
        preConfirm: closeConfirm,
        showLoaderOnConfirm: true
      });


      async function closeConfirm() {
        const ret = await blockchaindata.SaveTextToBlockchain(pageData);
        if (ret.result) {
            //toast
            setTimeout(function () {
              Swal.fire({
                title: 'The page has been success saved to Blockchain',
                icon: 'success',
                toast: true,
                position: 'bottom-end',
                timer: 6000,
                showConfirmButton: false,
                background: '#c1f7f0',
                heightAuto: false,
                scrollbarPadding: false,
              });
            }, 2000);
            ipcRender.send('dataTx', ret.txid);
          }
          else {
            setTimeout(function () {
              Swal.fire({
                title: 'The page hasn`t been saved to Blockchain',
                icon: 'error',
                toast: true,
                position: 'bottom-end',
                timer: 6000,
                showConfirmButton: false,
                background: '#c1f7f0',
                heightAuto: false,
                scrollbarPadding: false,
              });
            }, 2000);
          }
      }
    }
  });
});

ipcRender.on('txArr', (event, txArr) => {
  $('#mySitesCount').html(txArr.length);
  $('#pageTx').html('');
  txArr.forEach(item => {
    $('#pageTx').prepend(`<li class="collection-item blue lighten-4">tbtc://${item}</li>`);
  });
});
