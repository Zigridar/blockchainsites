'use strict'

const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

exports.start = function() {
  return new Promise((ok, error) => {
    db.serialize(() => {
      db.run('CREATE TABLE IF NOT EXISTS transactions (txid TEXT NOT NULL)', (err) => {
        ok();
      });

    });
  });
}

exports.addTx = function(txid) {
  return new Promise((ok, error) => {
    db.run(`INSERT INTO transactions (txid) VALUES ("${txid}")`, (err) => {
      // console.log(err);
      ok();
    });
  });
}

exports.getTx = function(txid) {
  return new Promise((ok, error) => {
    db.each(`SELECT * FROM transactions`, (err, row) => {
      console.log(row);
    });
    ok()
  });
}

exports.close = function() {
  db.close();
}
