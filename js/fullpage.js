'use strict'
const ipcRender = electron.ipcRenderer;


//materialize init
$(document).ready(function(){
  $('.sidenav').sidenav();
});
const elems = document.querySelectorAll('.collapsible');
const instances = M.Collapsible.init(elems, {});

setTimeout(function () {
  const elems1 = document.querySelectorAll('.dropdown-trigger');
  const instances1 = M.Dropdown.init(elems1, {constrainWidth: false});

  $('input.autocomplete').autocomplete({
    data: commandNames,
    limit: 8
  });

}, 2000);


const slideMove = function(anchorLink, index, slideAnchor, slideIndex) {
  $('.navigate-item').removeClass('active');
  switch (slideIndex) {
    case 0:
      $('#itemInfo').addClass('active');
      ipcRender.send('getbalance');
      break;
    case 1:
      $('#itemBrowser').addClass('active');
      break;
    // case 2:
    //   $('#itemSearch').addClass('active');
    //   break;
    case 2:
      $('#itemConstructor').addClass('active');
      ipcRender.send('getbalance');
      break;
    case 3:
      $('#itemTools').addClass('active');
      break;
  }
}

const loadPage = function() {
  $('#itemInfo').addClass('active');
  ipcRender.send('getbalance');
}

$(document).ready(function() {
  // browser.newTab('http://github.com/');

  const alertOnlineStatus = () => {
    if (navigator.onLine) {
      $('#internet_status').html('Internet state: connected');
      $('#internet_status').addClass('light-blue accent-3');
      $('#internet_status').removeClass('deep-orange darken-4');
    }
    else {
      $('#internet_status').html('Internet state: disconnected');
      $('#internet_status').addClass('deep-orange darken-4');
      $('#internet_status').removeClass('light-blue accent-3');
    }
  }

  window.addEventListener('online',  alertOnlineStatus)
  window.addEventListener('offline',  alertOnlineStatus)

  if (navigator.onLine) {
    $('#internet_status').html('Internet state: connected');
    $('#internet_status').addClass('light-blue accent-3');
    $('#internet_status').removeClass('deep-orange darken-4');
  }
  else {
    $('#internet_status').html('Internet state: disconnected');
    $('#internet_status').addClass('deep-orange darken-4');
    $('#internet_status').removeClass('light-blue accent-3');
  }

  $('#fullpage').fullpage({
    scrollingSpeed: 500,
    anchors: ["first", "second", "third"],
    verticalCentered: false,
    scrollOverflow: true,
    keyboardScrolling: false,
    controlArrows: false,
    scrollOverflowOptions: {preventDefault:false},
    afterSlideLoad: slideMove,
    afterLoad: loadPage
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

const commandNames = {
  'getbestblockhash': null,
  'getblock': null,
  'getblockchaininfo': null,
  'getblockcount': null,
  'getblockhash': null,
  'getblockheader': null,
  'getblockstats': null,
  'getchaintips': null,
  'getchaintxstats': null,
  'getdifficulty': null,
  'getmempoolancestors': null,
  'getmempooldescendants': null,
  'getmempoolentry': null,
  'getmempoolinfo': null,
  'getrawmempool': null,
  'gettxout': null,
  'gettxoutproof': null,
  'gettxoutsetinfo': null,
  'preciousblock': null,
  'pruneblockchain': null,
  'savemempool': null,
  'scantxoutset': null,
  'verifychain': null,
  'verifytxoutproof': null,
  'getmemoryinfo': null,
  'getrpcinfo': null,
  'help': null,
  'logging': null,
  'stop': null,
  'uptime': null,
  'generate': null,
  'generatetoaddress': null,
  'getblocktemplate': null,
  'getmininginfo': null,
  'getnetworkhashps': null,
  'prioritisetransaction': null,
  'submitblock': null,
  'submitheader': null,
  'addnode': null,
  'clearbanned': null,
  'disconnectnode': null,
  'getaddednodeinfo': null,
  'getconnectioncount': null,
  'getnettotals': null,
  'getnetworkinfo': null,
  'getnodeaddresses': null,
  'getpeerinfo': null,
  'listbanned': null,
  'ping': null,
  'setban': null,
  'setnetworkactive': null,
  'analyzepsbt': null,
  'combinepsbt': null,
  'combinerawtransaction': null,
  'converttopsbt': null,
  'createpsbt': null,
  'createrawtransaction': null,
  'decodepsbt': null,
  'decoderawtransaction': null,
  'decodescript': null,
  'finalizepsbt': null,
  'fundrawtransaction': null,
  'getrawtransaction': null,
  'joinpsbts': null,
  'sendrawtransaction': null,
  'signrawtransactionwithkey': null,
  'testmempoolaccept': null,
  'utxoupdatepsbt': null,
  'createmultisig': null,
  'deriveaddresses': null,
  'estimatesmartfee': null,
  'getdescriptorinfo': null,
  'signmessagewithprivkey': null,
  'validateaddress': null,
  'verifymessage': null,
  'abandontransaction': null,
  'abortrescan': null,
  'addmultisigaddress': null,
  'backupwallet': null,
  'bumpfee': null,
  'createwallet': null,
  'dumpprivkey': null,
  'dumpwallet': null,
  'encryptwallet': null,
  'getaddressesbylabel': null,
  'getaddressinfo': null,
  'getbalance': null,
  'getnewaddress': null,
  'getrawchangeaddress': null,
  'getreceivedbyaddress': null,
  'getreceivedbylabel': null,
  'gettransaction': null,
  'getunconfirmedbalance': null,
  'getwalletinfo': null,
  'importaddress': null,
  'importmulti': null,
  'importprivkey': null,
  'importprunedfunds': null,
  'importpubkey': null,
  'importwallet': null,
  'keypoolrefill': null,
  'listaddressgroupings': null,
  'listlabels': null,
  'listlockunspent': null,
  'listreceivedbyaddress': null,
  'listreceivedbylabel': null,
  'listsinceblock': null,
  'listtransactions': null,
  'listunspent': null,
  'listwalletdir': null,
  'listwallets': null,
  'loadwallet': null,
  'lockunspent': null,
  'removeprunedfunds': null,
  'rescanblockchain': null,
  'sendmany': null,
  'sendtoaddress': null,
  'sethdseed': null,
  'setlabel': null,
  'settxfee': null,
  'signmessage': null,
  'signrawtransactionwithwallet': null,
  'unloadwallet': null,
  'walletcreatefundedpsbt': null,
  'walletlock': null,
  'walletpassphrase': null,
  'walletpassphrasechange': null,
  'walletprocesspsbt': null,
  'help getzmqnotifications': null,
  'help getbestblockhash': null,
  'help getblock': null,
  'help getblockchaininfo': null,
  'help getblockcount': null,
  'help getblockhash': null,
  'help getblockheader': null,
  'help getblockstats': null,
  'help getchaintips': null,
  'help getchaintxstats': null,
  'help getdifficulty': null,
  'help getmempoolancestors': null,
  'help getmempooldescendants': null,
  'help getmempoolentry': null,
  'help getmempoolinfo': null,
  'help getrawmempool': null,
  'help gettxout': null,
  'help gettxoutproof': null,
  'help gettxoutsetinfo': null,
  'help preciousblock': null,
  'help pruneblockchain': null,
  'help savemempool': null,
  'help scantxoutset': null,
  'help verifychain': null,
  'help verifytxoutproof': null,
  'help getmemoryinfo': null,
  'help getrpcinfo': null,
  'help logging': null,
  'help stop': null,
  'help uptime': null,
  'help generate': null,
  'help generatetoaddress': null,
  'help getblocktemplate': null,
  'help getmininginfo': null,
  'help getnetworkhashps': null,
  'help prioritisetransaction': null,
  'help submitblock': null,
  'help submitheader': null,
  'help addnode': null,
  'help clearbanned': null,
  'help disconnectnode': null,
  'help getaddednodeinfo': null,
  'help getconnectioncount': null,
  'help getnettotals': null,
  'help getnetworkinfo': null,
  'help getnodeaddresses': null,
  'help getpeerinfo': null,
  'help listbanned': null,
  'help ping': null,
  'help setban': null,
  'help setnetworkactive': null,
  'help analyzepsbt': null,
  'help combinepsbt': null,
  'help combinerawtransaction': null,
  'help converttopsbt': null,
  'help createpsbt': null,
  'help createrawtransaction': null,
  'help decodepsbt': null,
  'help decoderawtransaction': null,
  'help decodescript': null,
  'help finalizepsbt': null,
  'help fundrawtransaction': null,
  'help getrawtransaction': null,
  'help joinpsbts': null,
  'help sendrawtransaction': null,
  'help signrawtransactionwithkey': null,
  'help testmempoolaccept': null,
  'help utxoupdatepsbt': null,
  'help createmultisig': null,
  'help deriveaddresses': null,
  'help estimatesmartfee': null,
  'help getdescriptorinfo': null,
  'help signmessagewithprivkey': null,
  'help validateaddress': null,
  'help verifymessage': null,
  'help abandontransaction': null,
  'help abortrescan': null,
  'help addmultisigaddress': null,
  'help backupwallet': null,
  'help bumpfee': null,
  'help createwallet': null,
  'help dumpprivkey': null,
  'help dumpwallet': null,
  'help encryptwallet': null,
  'help getaddressesbylabel': null,
  'help getaddressinfo': null,
  'help getbalance': null,
  'help getnewaddress': null,
  'help getrawchangeaddress': null,
  'help getreceivedbyaddress': null,
  'help getreceivedbylabel': null,
  'help gettransaction': null,
  'help getunconfirmedbalance': null,
  'help getwalletinfo': null,
  'help importaddress': null,
  'help importmulti': null,
  'help importprivkey': null,
  'help importprunedfunds': null,
  'help importpubkey': null,
  'help importwallet': null,
  'help keypoolrefill': null,
  'help listaddressgroupings': null,
  'help listlabels': null,
  'help listlockunspent': null,
  'help listreceivedbyaddress': null,
  'help listreceivedbylabel': null,
  'help listsinceblock': null,
  'help listtransactions': null,
  'help listunspent': null,
  'help listwalletdir': null,
  'help listwallets': null,
  'help loadwallet': null,
  'help lockunspent': null,
  'help removeprunedfunds': null,
  'help rescanblockchain': null,
  'help sendmany': null,
  'help sendtoaddress': null,
  'help sethdseed': null,
  'help setlabel': null,
  'help settxfee': null,
  'help signmessage': null,
  'help signrawtransactionwithwallet': null,
  'help unloadwallet': null,
  'help walletcreatefundedpsbt': null,
  'help walletlock': null,
  'help walletpassphrase': null,
  'help walletpassphrasechange': null,
  'help walletprocesspsbt': null,
  'help getzmqnotifications': null
}
