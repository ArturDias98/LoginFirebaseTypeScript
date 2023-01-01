import * as util from "./util/utilities";

const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
const recoveryBtn = document.getElementById("recoveryBtn") as HTMLButtonElement;

//Inputs
const email = document.getElementById("emailInput") as HTMLInputElement;
const password = document.getElementById("passwordInput") as HTMLInputElement;

//Span messages
const emailError = document.getElementById(
  "emailErrorMessage"
) as HTMLSpanElement;
const passwordError = document.getElementById(
  "passwordErrorMessage"
) as HTMLSpanElement;

//Add events
email.oninput = OnEmailChanged;
password.oninput = OnPasswordChanged;

//Raises when input value changes.
function OnEmailChanged() {
  toggleButtons();

  const message = util.validateEmail(email.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  changeSpanLayout(emailError, message, display);
}

function OnPasswordChanged() {
  toggleButtons();

  const message = util.validatePassword(password.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  changeSpanLayout(passwordError, message, display);
}

function toggleButtons() {
  recoveryBtn.disabled = !util.validateEmail(email.value);
  loginBtn.disabled =
    !util.validateEmail(email.value) || !util.validatePassword(password.value);
}

function changeSpanLayout(
  span: HTMLSpanElement,
  message: string,
  mode: string
) {
  span.style.display = mode;
  span.style.color = "orangered";
  span.innerText = message;
}
