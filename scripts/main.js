var data_value = '[db-data="value"]';
var DataStore = App.DataStore;

function addClickHandler(output) {
    output.forEach(function(element, index) {
        element.addEventListener('click', function(event) {
            console.log(element, index);
            DataStore.add(index, true);
        });
    });
}

function initialize_properties() {
    window.onload = function() {
        var rowData = DataStore.getAll();
        console.log(rowData);
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

initialize_properties();
