(function (window) {
  'use strict'
  var App = window.App || {};
  var $ = window.jQuery;
  var SERVER_URL = 'https://pure-reaches-99147.heroku.com/favorited';
  var remoteDS = new DataStore(SERVER_URL);

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
    $.get(this.serverUrl, function (serverResponse) {
      console.log(serverResponse);
    })
  };

  DataStore.prototype.remove = function (key) {

  };

  DataStore.prototype.removeAll = function () {

  };

  App.DataStore = remoteDS;
  window.App = App;
})(window);
