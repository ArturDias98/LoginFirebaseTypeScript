import * as util from "./util/utilities";

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

function OnDateChanged() {
  const display = !dateInput.value ? "block" : "none";
  util.changeSpanLayout(dateError, "Invalid", display);
  saveBtn.disabled = !toggleButton();
}

function OnValueChanged() {
  const _value = Number(valueInput.value);
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

function Save(){

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
