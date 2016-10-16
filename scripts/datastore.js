(function (window) {
  'use strict'
  var App = window.App || {};
  var $ = window.jQuery;
  var SERVER_URL = '/';
  var remoteDS = new DataStore(SERVER_URL);

  function DataStore(url) {
    if (!url) {
      throw new Error('No remote URL supplied');
    }
    this.serverUrl = url;
  }

  DataStore.prototype.add = function (key, value) {
    $.ajax({
        url: 'favorited',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          'row': key,
          'favorited': value
        }),
        success: function(data, textStatus){
            console.log(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
  };

  DataStore.prototype.update = function (key, value) {
    $.ajax({
        url: 'favorited',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          'row': key,
          'favorited': value
        }),
        success: function(data, textStatus){
            console.log(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
  };

  DataStore.prototype.get = function (key) {
    $.ajax({
        url: 'favorited/' + key,
        type: 'GET',
        contentType: 'application/json',
        success: function(data, textStatus){
            console.log(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
  };

  DataStore.prototype.getAll = function () {
    var callBack = "";
    $.ajax({
        url: 'favorited/',
        type: 'GET',
        dataType: 'json',
        async: false,
        contentType: 'application/json',
        success: function(data){
            callBack = data;
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
    return callBack;
  };

  DataStore.prototype.remove = function (key) {
    $.ajax({
        url: 'favorited/' + key,
        type: 'DELETE',
        contentType: 'application/json',
        success: function(data, textStatus){
            console.log(data);
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    });
  };

  App.DataStore = remoteDS;
  window.App = App;
})(window);
