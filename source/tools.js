'use strict';

const utils = require("./utils");
const tools = require("./tools");
const $ = require('jquery');

$('#formRPC').submit(e => {
    e.preventDefault();
    alert('on submit')
});