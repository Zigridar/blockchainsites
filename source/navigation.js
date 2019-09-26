'use strict';

const utils = require("./utils");
const ipcRender = electron.ipcRenderer;

const getSrc = function(url) {
  return new Promise(async ok => {
    const ret = await utils.GetPageFromBlockchain(url.substr(7), 'tBTC');
    url = "data:text/html;base64," + ret;
    ok(url);
  });
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
