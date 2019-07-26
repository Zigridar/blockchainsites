'use strict';

const utils = require("./utils");
const tools = require("./tools");
const $ = require('jquery');

$('#formRPC').submit(async e => {
    e.preventDefault();
    
    const method = $('#rpcCommand').val();
    const ret = await utils.sendRPC(method, '[]');
    
    $('#responceTextarea').val(JSON.stringify(ret));
});