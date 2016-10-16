var data_value = '[db-data="value"]';
var DataStore = App.DataStore;
var max_counter = 75;
var favorited_counter = 0;

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
        console.log((max_counter - favorited_counter));
    }
};

load_database();
