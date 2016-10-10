var data_value = '[db-data="value"]';
var DataStore = new App.DataStore();

function load_database() {
    var rowData = DataStore.getAll();
    console.log(rowData);
    update_values(rowData);
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
            if (rowData.length === 0) {
                output[index].innerHTML = '<favorite-star/>';
            } else {
                if (rowData[index] === true) {
                    output[index].innerHTML = '<favorite-star active/>';
                } else {
                    output[index].innerHTML = '<favorite-star/>';
                }
            }
        })
    }
};

load_database();
