let totBal = document.getElementById("showBalance");
let income = document.getElementById("showIncome");
let expense = document.getElementById("showExpense");
let itemsList = document.getElementById("history");
let addTransBtn = document.getElementById("addTransaction");


displayList();
addTransBtn.addEventListener("click", () => {
    let newItem = document.getElementById("addItem");
    let newItemAmount = document.getElementById("amount");

    let listItem = {
        item: newItem.value,
        amount: newItemAmount.value
    }

    let allItems = localStorage.getItem("allItems");
    if (allItems == null)
        items = [];
    else
        items = JSON.parse(allItems);

    items.push(listItem);
    localStorage.setItem("allItems", JSON.stringify(items));
    newItem.value = "";
    newItemAmount.value = "";

    displayList();
})


function displayList() {
    let html = "";
    let allItems = localStorage.getItem("allItems");
    if (allItems == null)
        items = [];
    else {
        items = JSON.parse(allItems);
    }

    if (items.length == 0)
        itemsList.innerHTML = `<div> nothing to display</div>`

    else {
        items.forEach((element, index) => {

            if (Number(element.amount) < 0)
                html += ` <div class="addedClass debit"><span class="item">${element.item}</span><span class="money">${Number(element.amount)}</span><button
                    class="deleteBtn">x</button></div>`;
            else if (Number(element.amount) > 0)
                html += `<div class="addedClass credit"><span class="item">${element.item}</span><span class="money">${Number(element.amount)}</span><button
                    class="deleteBtn">x</button></div>`;

        });
    }

    itemsList.innerHTML = html;
}