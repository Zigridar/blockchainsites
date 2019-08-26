//Load electron to the page
const electron = require('electron');
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
//Else other libs will be crashed
