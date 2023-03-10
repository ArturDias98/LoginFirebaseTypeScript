import * as firebase from "./util/utilFirebase";
import * as loading from "./loading";

import { User } from "firebase/auth";

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
logoutBtn.onclick = OnLogout;

const transactionBtn = document.getElementById(
  "transaction-btn"
) as HTMLButtonElement;
transactionBtn.onclick = OnAddNewTransaction;

const transactionList = document.getElementById(
  "transactions"
) as HTMLOListElement;

firebase.AuthGuard("../index.html");
firebase.UserStateChanged(findTransactions);

async function OnLogout() {
  const _result = await firebase.LogOut();
  if (!_result.result) {
    alert(_result.message);
    return;
  }
  window.location.href = "../index.html";
}
function OnAddNewTransaction() {
  window.location.href = "./transaction.html";
}

async function findTransactions(user: User) {
  loading.showLoading();

  addTransactionsToScreen(await firebase.GetTransactions(user));

  loading.hideLoading();
}
function addTransactionsToScreen(transactions: firebase.Transaction[]) {
  transactions.forEach((transaction) => {
    const li = document.createElement("li") as HTMLLIElement;
    li.classList.add(transaction.type);
    li.id = transaction.uid as string;
    li.addEventListener("click", () => {
      window.location.href = "./transaction.html?uid=" + transaction.uid;
    });

    const removeButton = document.createElement("button") as HTMLButtonElement;
    removeButton.innerHTML = "Remove";
    removeButton.classList.add("outline", "danger");
    removeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      askBeforeRemove(transaction);
    });
    li.appendChild(removeButton);

    const date = document.createElement("p") as HTMLParagraphElement;
    date.innerHTML = formateDate(transaction.date);
    li.appendChild(date);

    const money = document.createElement("p") as HTMLParagraphElement;
    money.innerHTML = formatMoney(transaction.money);
    li.appendChild(money);

    const info = document.createElement("p") as HTMLParagraphElement;
    info.innerHTML = transaction.info;
    li.appendChild(info);

    if (transaction.description) {
      const description = document.createElement("p") as HTMLParagraphElement;
      description.innerHTML = transaction.description;
      li.appendChild(description);
    }
    transactionList.appendChild(li);
  });
}
function formateDate(date: string) {
  return new Date(date).toLocaleDateString("pt-br", { timeZone: "UTC" });
}
function formatMoney(money: firebase.Money): string {
  return `${money.currency} ${money.value.toFixed(2)}`;
}
async function askBeforeRemove(transaction: firebase.Transaction) {
  const askRemove = confirm("Are you sure to delete this transaction");
  loading.showLoading();
  if (askRemove) {
    const response = await firebase.DeleteTransaction(transaction);
    if (!response.result) {
      alert(response.error);
    }
    else{
      document.getElementById(transaction.uid as string)?.remove();
    }
  }
  loading.hideLoading();
}
