import * as util from "./util/utilities";

const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
loginBtn.onclick = loginClick;
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

toggleButtons();
//Raises when input value changes.
function OnEmailChanged() {
  toggleButtons();

  const message = util.validateEmailMessage(email.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  changeSpanLayout(emailError, message, display);
}

function OnPasswordChanged() {
  toggleButtons();

  const message = util.validatePasswordMessage(password.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  changeSpanLayout(passwordError, message, display);
}

function toggleButtons() {
  const checkEmail = !util.validateEmail(email.value);
  const checkPassword = !util.validatePassword(password.value);

  recoveryBtn.disabled = checkEmail;
  loginBtn.disabled = checkEmail || checkPassword;
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

function loginClick() {
  window.location.href = "render/home.html";
}
