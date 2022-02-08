//All the DOM elements that we need

const balance = $("#showBalance");
const income = $("#showIncome");
const expense = $("#showExpense");
const list = $("#history");
const add_Item = $("#addItem");
const add_Amount = $("#amount");
const add_Transaction = $("#addTransaction");
let get_balance = 0,
    get_expense = 0,
    get_income = 0,
    get_item = "",
    get_amount = 0,
    transactions;

if (localStorage.getItem("transactions") == null) {
    transactions = [];
    document.querySelectorAll(".addedClass").forEach(element => {
        get_item = element.childNodes[0].innerText;
        get_amount = element.childNodes[1].innerText;
        let entry = ({
            item: get_item,
            money: get_amount
        });
        transactions.push(entry);
        localStorage.setItem("transactions", JSON.stringify(transactions));
    });
} else {
    transactions = JSON.parse(localStorage.getItem("transactions"))
}



if (localStorage.getItem("balance") == null)
    get_balance = (Number(balance.text())).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
else
    get_balance = JSON.parse(localStorage.getItem("balance"));
balance.html(`$${get_balance}`);

if (localStorage.getItem("expense") == null)
    get_expense = (Number(expense.text())).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
else
    get_expense = JSON.parse(localStorage.getItem("expense"));
expense.html(`$${get_expense}`);

if (localStorage.getItem("income") == null)
    get_income = (Number(income.text())).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
else
    get_income = JSON.parse(localStorage.getItem("income"));
income.html(`$${get_income}`);

let sign = "";


storeValues();

//display items in history

add_Transaction.click(() => {
    get_amount = add_Amount.val();
    get_item = add_Item.val();
    let entry = ({
        item: get_item,
        money: get_amount
    });
    transactions.push(entry);
    if (get_amount < 0) {
        $(`<div class="addedClass debit"><span class="item">${get_item}</span><span class = "money">${get_amount}</span><button class = "deleteBtn">x</button></div>`).appendTo(list);
        get_balance = (get_balance - Math.abs(get_amount)).toFixed(2);
        balance.html(`$${get_balance}`);
        get_expense = (Number(get_expense) + Number(Math.abs(get_amount))).toFixed(2);
        expense.html(`$${get_expense}`);
    } else {
        sign = "+";
        $(`<div class="addedClass credit"><span class="item">${get_item}</span><span class = "money">${sign}${get_amount}</span><button class = "deleteBtn">x</button></div>`).appendTo(list);
        get_balance = (Number(get_balance) + Number(Math.abs(get_amount))).toFixed(2);
        balance.html(`$${get_balance}`);
        get_income = (Number(get_income) + Number(Math.abs(get_amount))).toFixed(2);
        income.html(`$${get_income}`);
    }

    storeValues();
});

//Storing items in local storage

function storeValues() {
    localStorage.setItem("balance", JSON.stringify(get_balance));
    localStorage.setItem("income", JSON.stringify(get_income));
    localStorage.setItem("expense", JSON.stringify(get_expense));
    localStorage.setItem("transactions", JSON.stringify(transactions));
}