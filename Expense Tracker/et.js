const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


const localStorageTransaction = JSON.parse(localStorage.getItem("transaction"))
let transaction = localStorage.getItem("transaction") !== null ? localStorageTransaction:[];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim === "") {
    alert("Please Enter the Text and Value");
  } else {
    const tx = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transaction.push(tx);
    addTransactionDOM(tx);
    updateLocalStorage();
    updateValues();
    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
  <button class ="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )} </span> `;

  list.appendChild(item);
}
function removeTransaction(id){
  transaction = transaction.filter((transaction)=>transaction.id !== id)
  updateLocalStorage();
  Init();
}

function updateValues() {
  const amounts = transaction.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

function updateLocalStorage(){
    localStorage.setItem(
        "transaction",
        JSON.stringify(transaction)
    );
}

function Init() {
  list.innerHTML = "";
  transaction.forEach(addTransactionDOM);
  updateValues();
}
Init();
form.addEventListener("submit", addTransaction);
