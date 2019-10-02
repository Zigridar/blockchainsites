'use strict';

const utils = require("./utils");
const p2p = require('./p2p.js');
const ipcRender = electron.ipcRenderer;

(async () => {
  let status = await utils.isFullNode();

let getSrc;

if(status) {
    getSrc = function(url) {
    return new Promise(async ok => {
      const ret = await utils.GetPageFromBlockchain(url.substr(7), 'tBTC');
      url = "data:text/html;base64," + ret;
      ok(url);
    });
  }
}
else {
  getSrc = p2p.getSrc;
}

const browser = new navigation({
  defaultFavicons: true,
  getSrc: getSrc,
});

$(document).ready(function() {
  ipcRender.send('page-loaded');
});

ipcRender.on('oldBookmarks', (event, oldBookmarks) => {
  browser.bookmarks = oldBookmarks;
});

ipcRender.on('getJsonBookmarks', () => {
  const json = browser.getBookmarks();
  ipcRender.send('JsonBookmarks', JSON.stringify(json));
});

})()
