var data_value = '[db-data="value"]';
var DataStore = App.DataStore;

function load_database() {
    var rowData = DataStore.getAll();
    console.log(rowData);
}

function addClickHandler(output) {
    output.forEach(function(element, index) {
        element.addEventListener('click', function(event) {
            console.log(element, index);
            DataStore.add(index, true);
        });
    });
}

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
                } else {
                    output[index].innerHTML = '<favorite-star/>';
                }
            }
        })
    }
};

load_database();
