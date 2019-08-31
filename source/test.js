'use strict'

const utils = require('./utils.js');
const bitcoin = require('bitcoinjs-lib');

(async () => {
  // const privateKey = 'cNQtcWNsCzrqKQWmA849hvP5f4iJk6j6TYAZxjE98jJQz1HbRWg7';
  // const input = '59f8b63c5f0dbf620701735616cbc24737924b6c9de848aade438f1850dbaaa0';
  // const out = 1;
  // const amount = 3422000;
  // // const address = '2NAG7u6WguBG7K8h7Bmcrt3rB61NYAzv9gm';
  // const txb = new bitcoin.TransactionBuilder(bitcoin.networks.testnet);
  // const keyPair = bitcoin.ECPair.fromWIF(privateKey, bitcoin.networks.testnet);
  //
  // const output = bitcoin.script.compile([bitcoin.opcodes.OP_ADD, bitcoin.opcodes.OP_5, bitcoin.opcodes.OP_EQUAL]);
  //
  // txb.setVersion(2);
  // txb.addInput(input, out);
  // txb.addOutput(output, amount);
  //
  // txb.sign(0, keyPair);
  // const tx = txb.build().toHex();
  // console.log(tx);
  // // let addr = await utils.getAddress('cNQtcWNsCzrqKQWmA849hvP5f4iJk6j6TYAZxjE98jJQz1HbRWg7'); //cNQtcWNsCzrqKQWmA849hvP5f4iJk6j6TYAZxjE98jJQz1HbRWg7
  // // console.log(addr); //mm9kYZjCa35Z3mCbcRLLYNqjsTHMz8iQeq
  //
  // //tx: 59f8b63c5f0dbf620701735616cbc24737924b6c9de848aade438f1850dbaaa0

  // await utils.uniformTx('59f8b63c5f0dbf620701735616cbc24737924b6c9de848aade438f1850dbaaa0', 'cNQtcWNsCzrqKQWmA849hvP5f4iJk6j6TYAZxjE98jJQz1HbRWg7');
  // await utils.joinUniformOutputs('59f8b63c5f0dbf620701735616cbc24737924b6c9de848aade438f1850dbaaa0', '3b84811a149e070f4351bceb4fea91d76fa49d0b486eba4efd0c2c58ab00e9a8', 'cNQtcWNsCzrqKQWmA849hvP5f4iJk6j6TYAZxjE98jJQz1HbRWg7');
  const key = await utils.genPrivateKey('haha');
  console.log(key);
})();
