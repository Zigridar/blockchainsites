'use strict'

const slideMove = function(anchorLink, index, slideAnchor, slideIndex) {
  $('.nav-item').removeClass('active');
  switch (slideIndex) {
    case 0:
      $('#itemInfo').addClass('active');
      break;
    case 1:
      $('#itemConstructor').addClass('active');
      break;
    case 2:
      $('#itemSearch').addClass('active');
      break;
    case 3:
      $('#itemTools').addClass('active');
      break;
  }
}

$(document).ready(function() {
  $('#fullpage').fullpage({
    scrollingSpeed: 500,
    anchors: ["first", "second", "third"],
    verticalCentered: false,
    scrollOverflow: true,
    scrollOverflowOptions: {preventDefault:false},
    afterSlideLoad: slideMove
  });

  $('#createBtn').click(() => {
    $.fn.fullpage.reBuild();
  });

  $('.openBtn').click(() => {
    $.fn.fullpage.reBuild();
  });

  $('#formRPC').submit(() => {
    setTimeout(() => {
      $.fn.fullpage.reBuild();
    }, 500);
  });
});

const commandNames = [
  'getbestblockhash',
  'getblock',
  'getblockchaininfo',
  'getblockcount',
  'getblockhash',
  'getblockheader',
  'getblockstats',
  'getchaintips',
  'getchaintxstats',
  'getdifficulty',
  'getmempoolancestors',
  'getmempooldescendants',
  'getmempoolentry',
  'getmempoolinfo',
  'getrawmempool',
  'gettxout',
  'gettxoutproof',
  'gettxoutsetinfo',
  'preciousblock',
  'pruneblockchain',
  'savemempool',
  'scantxoutset',
  'verifychain',
  'verifytxoutproof',
  'getmemoryinfo',
  'getrpcinfo',
  'help',
  'logging',
  'stop',
  'uptime',
  'generate',
  'generatetoaddress',
  'getblocktemplate',
  'getmininginfo',
  'getnetworkhashps',
  'prioritisetransaction',
  'submitblock',
  'submitheader',
  'addnode',
  'clearbanned',
  'disconnectnode',
  'getaddednodeinfo',
  'getconnectioncount',
  'getnettotals',
  'getnetworkinfo',
  'getnodeaddresses',
  'getpeerinfo',
  'listbanned',
  'ping',
  'setban',
  'setnetworkactive',
  'analyzepsbt',
  'combinepsbt',
  'combinerawtransaction',
  'converttopsbt',
  'createpsbt',
  'createrawtransaction',
  'decodepsbt',
  'decoderawtransaction',
  'decodescript',
  'finalizepsbt',
  'fundrawtransaction',
  'getrawtransaction',
  'joinpsbts',
  'sendrawtransaction',
  'signrawtransactionwithkey',
  'testmempoolaccept',
  'utxoupdatepsbt',
  'createmultisig',
  'deriveaddresses',
  'estimatesmartfee',
  'getdescriptorinfo',
  'signmessagewithprivkey',
  'validateaddress',
  'verifymessage',
  'abandontransaction',
  'abortrescan',
  'addmultisigaddress',
  'backupwallet',
  'bumpfee',
  'createwallet',
  'dumpprivkey',
  'dumpwallet',
  'encryptwallet',
  'getaddressesbylabel',
  'getaddressinfo',
  'getbalance',
  'getnewaddress',
  'getrawchangeaddress',
  'getreceivedbyaddress',
  'getreceivedbylabel',
  'gettransaction',
  'getunconfirmedbalance',
  'getwalletinfo',
  'importaddress',
  'importmulti',
  'importprivkey',
  'importprunedfunds',
  'importpubkey',
  'importwallet',
  'keypoolrefill',
  'listaddressgroupings',
  'listlabels',
  'listlockunspent',
  'listreceivedbyaddress',
  'listreceivedbylabel',
  'listsinceblock',
  'listtransactions',
  'listunspent',
  'listwalletdir',
  'listwallets',
  'loadwallet',
  'lockunspent',
  'removeprunedfunds',
  'rescanblockchain',
  'sendmany',
  'sendtoaddress',
  'sethdseed',
  'setlabel',
  'settxfee',
  'signmessage',
  'signrawtransactionwithwallet',
  'unloadwallet',
  'walletcreatefundedpsbt',
  'walletlock',
  'walletpassphrase',
  'walletpassphrasechange',
  'walletprocesspsbt',
  'getzmqnotifications'
]

$('#rpcCommand').autocomplete({
  lookup: commandNames,
  maxHeight: 250,
  autoSelectFirst: true
});
