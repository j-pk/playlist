(function (window) {
  'use strict'
  var App = window.App || {};
  var $ = window.jQuery;
  var SERVER_URL = '/';
  var remoteDS = new DataStore(SERVER_URL);
  var callBack;

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
        success: function(data, textStatus, jQxhr){
            $('#response pre').html( data );
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
  };

  DataStore.prototype.get = function (key) {
    $.ajax({
        url: 'favorited/' + key,
        type: 'GET',
        contentType: 'application/json',
        success: function(data, textStatus, jQxhr){
            $('#response pre').html(data);
            console.log(data);
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
  };

  DataStore.prototype.getAll = function (callBack) {
    $.ajax({
        url: 'favorited/',
        type: 'GET',
        contentType: 'application/json',
        success: function(data, textStatus, jQxhr){
            $('#response pre').html(data);
            callBack = data;
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(errorThrown);
        }
    });
    callBack(callBack);
  };

  DataStore.prototype.remove = function (key) {

  };

  DataStore.prototype.removeAll = function () {

  };

  App.DataStore = remoteDS;
  window.App = App;
})(window);
