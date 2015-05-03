/*global angular:true, moment:true, _:true */
(function () {
  'use strict';

  angular.module('rethinkDBWorkshop.services', [])
    .factory('MessageFactory', MessageFactory);

  MessageFactory.$inject = ['$http', '$state', '$q', '$rootScope'];

  function MessageFactory ($http, $state, $q, $rootScope) {
    console.log('MessageFactory');

    var socket = io.connect('http://' + window.config.url + ':' + window.config.ports.http);
    var messageCollection = [];

    //$rootScope.$watch(function () {
      //return messageCollection;
    //}, function (newVal, oldVal) {
      //console.log(newVal, oldVal);
      //return true;
      ////return angular.equals(newVal, oldVal);
    //});


    var factory = {
      messageCollection: messageCollection,
      getMessageCollection: getMessageCollection,
      addMessage: addMessage,
    };

    factory.getMessageCollection();

    return factory;

    function getMessageCollection() {
      return $http.get('/messages')
        .then(function (res) {
          console.log('messages', res.data);
          messageCollection = res.data;
          socket.on('message', function (message) {
            console.log('New Message', message);
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
