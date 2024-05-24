$(document).ready(function () {
    fetchData();

    $("#btnAdd").click(function () {
        showModal("Add New Item");
    });

    $("#btnSave").click(function () {
        saveData();
    });

    $(".close").click(function () {
        closeModal();
    });
});

function fetchData() {
    const data = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 3" }
    ];

    displayData(data);
}

function displayData(data) {
    $("#dataBody").empty();

    $.each(data, function (index, item) {
        const row = `<tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>
                            <button onclick="editItem(${item.id})">Edit</button>
                            <button onclick="deleteItem(${item.id})">Delete</button>
                        </td>
                    </tr>`;
        $("#dataBody").append(row);
    });
}

function showModal(title) {
    $("#modal").show();
    $(".modal-content").find("label").text(title);
}

function closeModal() {
    $("#modal").hide();
}

function saveData() {
    const newItemName = $("#itemName").val();
    const currentData = getCurrentData();

    const nextId = currentData.length > 0 ? Math.max(...currentData.map(item => item.id)) + 1 : 1;

    const newData = { id: nextId, name: newItemName };
    currentData.push(newData);

    displayData(currentData);
    closeModal();
}


function editItem(id) {
    const currentData = getCurrentData();
    const selectedItem = currentData.find(item => item.id === id);

    $("#itemName").val(selectedItem.name);

    showModal("Edit Item");

    $("#btnSave").click(function () {
        selectedItem.name = $("#itemName").val();
        displayData(currentData);
        closeModal();
    });
}

function deleteItem(id) {
    const currentData = getCurrentData();
    const updatedData = currentData.filter(item => item.id !== id);

    displayData(updatedData);
}

function getCurrentData() {
    const currentData = [];
    $("#dataBody tr").each(function () {
        const id = $(this).find("td:eq(0)").text();
        const name = $(this).find("td:eq(1)").text();
        currentData.push({ id: parseInt(id), name: name });
    });

    return currentData;
}
