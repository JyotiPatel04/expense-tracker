const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = (amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0) * -1).toFixed(2);

  balanceEl.innerText = `₹${total}`;
  incomeEl.innerText = `₹${income}`;
  expenseEl.innerText = `₹${expense}`;
}

function addTransactionToDOM(transaction) {
  const li = document.createElement("li");
  li.classList.add(transaction.amount > 0 ? "plus" : "minus");
  li.innerHTML = `
    ${transaction.text} <span>${transaction.amount > 0 ? "+" : ""}₹${transaction.amount}</span>
    <button onclick="removeTransaction(${transaction.id})">❌</button>
  `;
  transactionList.appendChild(li);
}

function init() {
  transactionList.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please enter description and amount");
    return;
  }
  const transaction = {
    id: Date.now(),
    text: textInput.value,
    amount: +amountInput.value
  };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionToDOM(transaction);
  updateValues();
  textInput.value = "";
  amountInput.value = "";
});

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  init();
}

init();
