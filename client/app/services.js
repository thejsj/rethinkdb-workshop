/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('rethinkDBWorkshop.services', [])
    .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['$http', '$state', '$q', '$rootScope'];

  function MessageFactory ($http, $state, $q, $rootScope) {

    var socket = io.connect('http://' + window.config.url + ':' + window.config.ports.http);
    var messageCollection = [];

    socket.on('message', function (message) {
      $rootScope.$apply(function () {
        messageCollection.push(message);
      });
    });

    var factory = {
      getMessageCollection: getMessageCollection,
      addMessage: addMessage,
    };

    factory.getMessageCollection();

    return factory;

    function getMessageCollection() {
      return $http.get('/messages')
        .then(function (res) {
          res.data.forEach(function (row) {
            messageCollection.push(row);
          });
          return messageCollection;
        });
    }

    function addMessage(text) {
      socket.emit('message', {
        text: text,
        email: window.config.email
      });
    }

  }

})();
