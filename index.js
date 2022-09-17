let totBal = document.getElementById("showBalance");
let income = document.getElementById("showIncome");
let expense = document.getElementById("showExpense");
let itemsList = document.getElementById("history");
let addTransBtn = document.getElementById("addTransaction");
let newItem = document.getElementById("addItem");
let newItemAmount = document.getElementById("amount");
let inc,balance,exp;

displayList();

//display income and expense

function displayIncExpense(){
       if((localStorage.getItem("balance"))==null)
    {
       localStorage.setItem('balance',totBal.innerHTML);
       totBal.innerHTML=`$${totBal.innerHTML}`;
      
    }
    else
       totBal.innerHTML=`$${localStorage.getItem('balance')}`;

       if((localStorage.getItem("income"))==null)
       {
        localStorage.setItem('income',income.innerHTML);
        income.innerHTML=`$${income.innerHTML}`;
       }
    else
      income.innerHTML=`$${localStorage.getItem("income")}`;

       if((localStorage.getItem("expense"))==null)
       {
        localStorage.setItem('expense',expense.innerHTML);
        expense.innerHTML=`$${expense.innerHTML}`;
       }
    else
      expense.innerHTML=`$${localStorage.getItem("expense")}`;
}

//Display the list on the screen
function displayList() {
    displayIncExpense();
    let html = "";
    let allItems = localStorage.getItem("allItems");
    if (allItems == null)
        items = [];
    else
        items = JSON.parse(allItems);

    if (items.length == 0) {
        html += `<div class="noItems">No new items to display<br>Add items from below</div>`
        itemsList.innerHTML = html;
    } else {
        items.forEach((element, index) => {

            if (Number(element.amount) < 0)
                html += ` <div class="addedClass debit"><span class="item">${element.item}</span><span class="money">${Number(element.amount)}</span><button
                    class="deleteBtn" id=${index} onclick="deleteElm(this.id)">x</button></div>`;
            else if (Number(element.amount) > 0)
                html += `<div class="addedClass credit"><span class="item">${element.item}</span><span class="money">${Number(element.amount)}</span><button
                    class = "deleteBtn"  id=${index} onclick = "deleteElm(this.id)"> x </button></div > `;

        });
    }

    itemsList.innerHTML = html;
}

//delete something from the list

function deleteElm(index) {
    items.splice(index, 1);
    localStorage.setItem("allItems", JSON.stringify(items));
    displayList();
}

//transfer focus to other input box on enter
newItem.addEventListener("keyup", (e) => {
    if (e.key == 'Enter')
        newItemAmount.focus();
});



//When the transaction button is fired on keyboard event or clicked manually
newItemAmount.addEventListener("keyup", (e) => {
    if (e.key == 'Enter')
        TransactionFnc();
})
addTransBtn.addEventListener("click", () => {
    TransactionFnc();
})

//on the firing of addTransaction button
function TransactionFnc() {
    let listItem = {
        item: newItem.value,
        amount: newItemAmount.value
    }

    
    
    if(Number(listItem.amount)>0)
    {
        inc=(parseInt((income.innerHTML).replace(/^\D+/g, ''))+parseInt(listItem.amount)).toFixed(2);
        income.innerHTML=`${inc}`;
        localStorage.setItem('income',inc);
    }
    else
    {
        inc=(parseInt((expense.innerHTML).replace(/^\D+/g, ''))-parseInt(listItem.amount)).toFixed(2);
        expense.innerHTML=`${inc}`;
        localStorage.setItem('expense',inc);
    }
    
    // balance=income.innerHTML;
    inc = (income.innerHTML).replace( /^\D+/g, '');
    exp = (expense.innerHTML).replace( /^\D+/g, '');
    
    balance=(parseInt(inc)-parseInt(exp)).toFixed(2);
    totBal.innerHTML=`$${balance.replace( /^\D+/g, '')}`;
    localStorage.setItem('balance',balance);

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
    newItem.focus();
}