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
            if (element.hasAttribute("favorited")) {
              DataStore.update(index, true);
              element.setAttribute('id', 'notFavorited');
              console.log('true');
            } else {
              DataStore.update(index, false);
              console.log('false');
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
            if (rowData === undefined) {
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

load_database();
