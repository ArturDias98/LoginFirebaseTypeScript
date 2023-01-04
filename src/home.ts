import * as firebase from "./util/utilFirebase";
import { getFirestore, collection, getDocs, where , query} from "firebase/firestore";
import { User } from "firebase/auth";

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
logoutBtn.onclick = OnLogout;

const transactionList = document.getElementById(
  "transactions"
) as HTMLOListElement;

firebase.AuthGuard("../index.html");
firebase.UserStateChanged(findTransactions);

const firestore = getFirestore();

//findTransactions();

async function OnLogout() {
  const _result = await firebase.LogOut();
  if (!_result.result) {
    alert(_result.message);
    return;
  }
  window.location.href = "../index.html";
}

async function findTransactions(user:User) {
  //Creating a query
  const collect  = collection(firestore, "transactions");
  const _query = query(collect, where("user.uid", "==", user.uid));
  let data = await getDocs(_query);
  const transactions = data.docs.map(doc => doc.data()) as Transaction[];
  addTransactionsToScreen(transactions);
  
}
function addTransactionsToScreen(transactions: Transaction[]) {
  transactions.forEach((transaction) => {
    const li = document.createElement("li") as HTMLLIElement;
    li.classList.add(transaction.type);

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
  return new Date(date).toLocaleDateString("pt-br");
}
function formatMoney(money: Money): string {
  return `${money.currency} ${money.value.toFixed(2)}`;
}

type Transaction = {
  type: string;
  date: string;
  money: Money;
  info: string;
  description?: string;
};
type Money = {
  currency: string;
  value: number;
};
