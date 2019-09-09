Before launch you have to create a file "bitcoin.conf" in your directory of bitcoin.

The "bitcoin.conf" must contain the following lines:
---
testnet=1

rpcuser=rpc_btc_test

rpcpassword=rpc_btc_password_test

server=1

rpcallowip=127.0.0.1

txindex=1

limitancestorcount=10000

limitdescedantcount=10000

walletrejectlongchains=0

The first launch:
---

npm install

npm install -g browserify

npm install -g electron

npm start
