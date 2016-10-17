var data_value = '[db-data="value"]';
var DataStore = App.DataStore;
var max_counter = 75;
var favorited_counter = 0;
var remaining_count = 0;

function load_database() {
    var rowData = DataStore.getAll();
    console.log(rowData);
    update_values(rowData);
    counter = rowData.length;
};

function addClickHandler(output) {
    output.forEach(function(element, index) {
        element.addEventListener('click', function(event) {
            console.log(element, index);
            if (element.id === "notFavorited") {
              DataStore.update(index, true);
              element.setAttribute('id', 'notFavorited');
              favorited_counter += 1;
              update_counter(favorited_counter);
            } else {
              DataStore.update(index, false);
              element.setAttribute('id', 'favorited');
              favorited_counter -= 1;
              update_counter(favorited_counter);
            }
        });
    });
};

function update_values(rowData) {
    window.onload = function() {
        var output = document.querySelectorAll(data_value);
        addClickHandler(output);
        output.forEach(function(element, index) {
            if (rowData === undefined || rowData[index] === undefined) {
                output[index].innerHTML = '<favorite-star/>';
            } else {
                if (rowData[index].favorited === true) {
                    output[index].innerHTML = '<favorite-star active/>';
                    output[index].setAttribute('id', 'favorited');
                    favorited_counter += 1;
                } else {
                    output[index].innerHTML = '<favorite-star/>';
                    output[index].setAttribute('id', 'notFavorited');
                }
            }
        });
        update_counter(favorited_counter);
        sticky_counter();
    }
};

function update_counter(favorited_counter) {
  var bar = document.getElementById('counter');
  remaining_count = max_counter - favorited_counter;
  bar.textContent = 'Remaining: ' + remaining_count;
}

function sticky_counter() {
  var startProductBarPos = -1;
  window.onscroll = function() {
      var bar = document.getElementById('counter');
      if (startProductBarPos <  0) startProductBarPos = findPosY(bar);

      if (pageYOffset > startProductBarPos){
          bar.style.position = 'fixed';
          bar.style.top = 0;
      } else {
          bar.style.position = 'relative';
      }
  };
};

function findPosY(obj) {
    var curtop = 0;
    if (typeof (obj.offsetParent) != 'undefined' && obj.offsetParent) {
        while (obj.offsetParent) {
            curtop += obj.offsetTop;
            obj = obj.offsetParent;
        }
        curtop += obj.offsetTop;
    }
    else if (obj.y)
        curtop += obj.y;
    return curtop;
};

load_database();
