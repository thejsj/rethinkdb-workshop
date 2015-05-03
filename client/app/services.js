/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('rethinkDBWorkshop.services', [])
    .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['$http', '$state', '$q'];

  function MessageFactory($http, $state, $q) {

    var socket = io.connect('http://' + window.config.url + ':' + window.config.ports.http);
    var messageCollection;

    var factory = {
      getMessageCollection: getMessageCollection,
      addMessage: addMessage,
    };

    return factory;

    function getMessageCollection() {
      return $http.get('/messages')
        .then(function (res) {
          messageCollection = res.data;
          socket.on('message', function (message) {
            messageCollection.push(message);
          });
          return messageCollection;
        });
    }

    function addMessage(text) {
      socket.emit('message', {
        text: text
      });
    }

  }

})();
