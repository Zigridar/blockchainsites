'use strict';

//browserify --debug index.js > ../js/index.js

const utils = require("./utils");
const tools = require("./tools");
const constructor = require("./constructor");
const constants = require('./constants.js');
const $ = require('jquery');

const shell = electron.shell;
const clipboard = electron.clipboard;

  $("#getLink").click((e) => {
    e.preventDefault();
    shell.openExternal(constants.getMemory.faucet);
  });

  $("#copyAddress").click(async (e) => {
    e.preventDefault();
    // const address = await.utils.readAddress();
    const address = "It works"
    clipboard.writeText(address);
  });
