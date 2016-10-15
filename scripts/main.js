var data_value = '[db-data="value"]';
var DataStore = App.DataStore;

function load_database() {
    var rowData = DataStore.getAll();
    console.log(rowData);
    update_values(rowData);
};

function addClickHandler(output) {
    output.forEach(function(element, index) {
        element.addEventListener('click', function(event) {
            console.log(element, index);
            if (element.id === "notFavorited") {
              DataStore.update(index, true);
              element.setAttribute('id', 'notFavorited');
            } else {
              DataStore.update(index, false);
              element.setAttribute('id', 'favorited');
            }
        });
    });
};

function update_values(rowData) {
    window.onload = function() {
        var output = document.querySelectorAll(data_value);
        addClickHandler(output);
        update_counter(output);
        console.log(update_counter(output));
        output.forEach(function(element, index) {
            if (rowData === undefined || rowData[index] === undefined) {
                output[index].innerHTML = '<favorite-star/>';
            } else {
                if (rowData[index].favorited === true) {
                    output[index].innerHTML = '<favorite-star active/>';
                    output[index].setAttribute('id', 'favorited');
                } else {
                    output[index].innerHTML = '<favorite-star/>';
                    output[index].setAttribute('id', 'notFavorited');
                }
            }
        })
    }
};

function update_counter(output) {
  var counter = 0;
  output.forEach(function(element, index) {
    if (element.id === "favorited") {
      counter += 1
    }
  });
  console.log(counter);
  return counter;
};

load_database();
