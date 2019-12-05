'use strict'

const path = require('path');
const $ = require('jquery');
const ipcRender = electron.ipcRenderer;
const shell = electron.shell;

//download bitcoin-core with main process
$('#download').click(() => {
  ipcRender.send('download');
  $('#download').addClass('disabled');
});

//setup bitcoin-core
$('#setup').click(() => {
  ipcRender.send('setup');
});

ipcRender.on('downloaded', () => {
  console.log('bitcoin-core installer success downloaded');
  console.log('Now you can install it with "setup" button');
  $('#setup').removeClass('disabled');
});

ipcRender.on('download-failed', () => {
  console.log('download-failed');
  $('#download').removeClass('disabled');
});

ipcRender.on('progress', (event, value) => {
  console.log(value);
  $('#progress').css('width', `${value}%`);
});
