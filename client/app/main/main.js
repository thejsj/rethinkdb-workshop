/*global angular:true */
(function () {
  'use strict';

  angular.module('rethinkDBWorkshop.messages', ['ui.router'])
    .controller('MessagesController', MessagesController);

  MessagesController.$inject = ['$window', 'MessageFactory'];

  function MessagesController($window, MessageFactory) {
    var vm = this;
    vm.messages = MessageFactory.messageCollection;
    vm.submit = submit;

    function submit() {
      if (vm.text.length > 0) {
        MessageFactory.addMessage(vm.text);
        vm.text = '';
      }
    }

  }
})();
