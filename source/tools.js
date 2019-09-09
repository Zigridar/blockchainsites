'use strict'

const utils = require("./utils");
const $ = require('jquery');
const util = require('util');

$('#formRPC').submit(async e => {

  e.preventDefault();

  const strBody = $('#rpcCommand').val();
  let ret = await utils.commandLine(strBody);

  $('#rpcCommand').val('');

  $('#resultCard').show();

  if('object' == typeof ret.result) {
    if(ret.error == null) {
      $("#resultTitle").html("Result");
      ret = util.inspect(ret.result, {
        depth: Infinity,
      });
    }
    else {
      $("#resultTitle").html("Error");
      ret = util.inspect(ret.error, {
        depth: Infinity,
      });
    }
    $('#responceTextarea').html(ret);
  }

  $('#responceTextarea').html(ret.result);

});
