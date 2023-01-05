import * as util from "./util/utilities";
import * as loading from "./loading";
import * as firebase from "./util/utilFirebase";
import { User } from "firebase/auth";

const dateInput = document.getElementById("date") as HTMLInputElement;
dateInput.oninput = OnDateChanged;
dateInput.onblur = OnDateChanged;

const dateError = document.getElementById(
  "dateErrorMessage"
) as HTMLSpanElement;

const valueInput = document.getElementById("value") as HTMLInputElement;
valueInput.oninput = OnValueChanged;

const valueError = document.getElementById(
  "valueErrorMessage"
) as HTMLSpanElement;

const transactionInfo = document.getElementById(
  "type-transaction"
) as HTMLSelectElement;
transactionInfo.oninput = OnTransactionInfoChanged;
transactionInfo.onblur = OnTransactionInfoChanged;

const transactionError = document.getElementById(
  "infoErrorMessage"
) as HTMLSelectElement;

const saveBtn = document.getElementById("save-btn") as HTMLButtonElement;
saveBtn.onclick = Save;

const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
cancelBtn.onclick = OnCancel;

const isExpense = document.getElementById("expense") as HTMLInputElement;
const currency = document.getElementById("currency") as HTMLSelectElement;
const description = document.getElementById("description") as HTMLInputElement;

let currentUser: User;

firebase.UserStateChanged(userChanged);

function OnDateChanged() {
  const display = !dateInput.value ? "block" : "none";
  util.changeSpanLayout(dateError, "Invalid", display);
  saveBtn.disabled = !toggleButton();
}

function OnValueChanged() {
  const _value = parseFloat(valueInput.value);
  if (!_value || _value < 0) {
    util.changeSpanLayout(valueError, "Invalid", "block");
  } else {
    util.changeSpanLayout(valueError, "", "none");
  }
  saveBtn.disabled = !toggleButton();
}

function OnTransactionInfoChanged() {
  const display = !transactionInfo.value ? "block" : "none";
  util.changeSpanLayout(transactionError, "Invalid", display);
  saveBtn.disabled = !toggleButton();
}

async function Save() {
  loading.showLoading();
  const transactionType = isExpense.checked ? "expense" : "income";

  const model: firebase.Transaction = {
    type: transactionType,
    date: dateInput.value,
    money: {
      currency: currency.value,
      value: parseFloat(valueInput.value),
    },
    user: {
      uid: currentUser.uid,
    },
    info: transactionInfo.value,
    description: description.value,
  };

  const result = await firebase.SetTransaction(model);

  loading.hideLoading();

  

  if (result.error) {
    alert(result.message);
    return;
  }
  //console.log(model);
  window.location.href = "./home.html";
}

function OnCancel() {
  window.location.href = "./home.html";
}

function toggleButton() {
  if (!dateInput.value) {
    return false;
  }
  if (!valueInput.value) {
    return false;
  }
  if (!transactionInfo.value) {
    return false;
  }

  return true;
}
function userChanged(user: User) {
  currentUser = user;
}
