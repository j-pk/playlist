(function (window) {
  'use strict'
  var App = window.App || {};
  var $ = window.jQuery;

  function DataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }

    this.serverUrl = url;
  }

  DataStore.prototype.add = function (key, value) {
    $.post(this.serverUrl, value, function (serverResponse) {
      console.log(serverResponse);
    });
  };

  DataStore.prototype.get = function (key) {

  };

  DataStore.prototype.getAll = function () {

  };

  DataStore.prototype.remove = function (key) {

  };

  DataStore.prototype.removeAll = function () {

  };

  App.DataStore = DataStore;
  window.App = App;
})(window);
