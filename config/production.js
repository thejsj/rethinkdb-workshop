/*jshint node:true */
'use strict';
/**
 * Inherits from `default.js`
 */
var config = {
  'rethinkdb': {
    'host': process.env.RETHINKDB_PORT_28015_TCP_ADDR,
    'port': process.env.RETHINKDB_PORT_28015_TCP_PORT
  },
  'ports' : {
    'http' : process.env.PORT
  },
  'url': 'rethinkdb-chat.thejsj.com'
};

module.exports = config;