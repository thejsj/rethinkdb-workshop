var r = require('./db');

// My own personal preference is to attach a connection to the
// RethinkDB object, but this might be confusing since some
// people might imply that all instances of RethinkDB have an
// instance attached to them.
module.exports = function () {
  return r.conn;
};
