'use strict';

const $ = require('jquery');
const zlib = require('zlib');
const g_crypto = require('crypto');
const bip65 = require('bip65');
const bitcoin = require('bitcoinjs-lib');
const fetch = require('node-fetch');

const networks = {
  'tBTC' : {
      url: 'http://195.154.113.90:18332', 
      user: 'rpc_bts_test', 
      password: 'rpc_btc_password_test', 
      name: 'Bitcoin', 
      NETWORK: bitcoin.networks.testnet
  },
};

exports.sendRPC = function(method, params, network = "tBTC")
{
  const headers = {
      'Content-Type': 'text/plain', 
      'Authorization': 'Basic ' + new Buffer(networks[network].user + ':' + networks[network].password).toString('base64')
  }

  const body = '{"jsonrpc": "1.0", "id":"curltest", "method": "'+method+'", "params": '+params+' }';
  
  return fetch(networks[network].url, {
        method: 'post', 
        headers: headers,
        body: body})
        .then(res => res.json());   
    
}

exports.importaddress = function(address, label = "", network = "tBTC")
{
    return exports.sendRPC('importaddress', '["'+address+'", "'+label+'", false]', network);
}

exports.broadcast = function(hex, network = "tBTC")
{
    return exports.sendRPC('sendrawtransaction', '["'+hex+'"]', network);
}

exports.getrawtransaction = function(txid, network = "tBTC")
{
    return exports.sendRPC('getrawtransaction', '["'+txid+'", true]', network);
}

exports.listsinceblock = function(hash, network = "tBTC")
{
    return exports.sendRPC('listsinceblock', '["'+hash+'", 1, true]', network);
}

exports.unspents = function(address = "", conf = 0, maxconf = 9999999, network = "tBTC")
{
    const filter = address.length ? ', ["'+address+'"]' : "";

    return exports.sendRPC('listunspent', '['+conf+', '+maxconf+filter+']', network);
}

exports.height = function(network = "tBTC")
{
    return exports.sendRPC('getblockcount', '[]', network);
}

exports.getblockhash = function(height, network = "tBTC")
{
    return exports.sendRPC('getblockhash', '['+height+']', network);
}

exports.Hash160 = function(str)
{
    const buffer = str.length % 2 != 0 ? Buffer.from(str) : Buffer.from(str, "hex");
    return g_crypto.createHash("ripemd160").update(buffer).digest('hex')
}
