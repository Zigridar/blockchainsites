'use strict'

exports.tx = {
  FEE_FOR_BYTE: 60,    //Change
  EMPTY_TX_SIZE: 166,  //Change
  MAX_DATA_SIZE: 520,  //Change
  AMOUNT_FOR_EXTRA: 1, //Change
  PART_SIZE: 1024,     //Change
  ONE_OUTPUT_SIZE: 50,  //Change
  MAX_TRANSACTION_SIZE: 50*1024
}

exports.ipcSave = {
   title: "Save page",
   buttonLabel : "Save",
   filters :[
    {name: 'html', extensions: ['html']}
   ]
}

exports.ipcOpen = {
  title : "Choose the HTML file",
  buttonLabel : "Load",
  filters :[
   {name: 'html', extensions: ['html']}
  ],
  properties: ['openFile']
}

exports.getMemory = {
  faucet: "https://coinfaucet.eu/en/btc-testnet/"
}
