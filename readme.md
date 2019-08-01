Before launch you have to create a file "bitcoin.conf" in your directory of bitcoin.

The "bitcoin.conf" must contain the following lines:

---
rpcuser=rpc_bts_test

rpcpassword=rpc_btc_password_test

server=1

rpcallowip=127.0.0.1
---


The first launch:

npm install -g browserify

npm install -g electron

npm install

npm run-script build

npm start

Following launches:

npm run-script build

npm start
