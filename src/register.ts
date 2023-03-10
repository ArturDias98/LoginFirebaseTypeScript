import * as util from "./util/utilities";
import * as loading from "./loading";
import * as firebase from "./util/utilFirebase";
import { User } from "firebase/auth";
//Input
const email = document.getElementById("email") as HTMLInputElement;
email.oninput = OnEmailChanged;

const password = document.getElementById("password") as HTMLInputElement;
password.oninput = OnPasswordChanged;

const confirm_password = document.getElementById(
  "password-confirm"
) as HTMLInputElement;
confirm_password.oninput = OnConfirmPasswordChanged;

//Span
const emailError = document.getElementById(
  "emailErrorMessage"
) as HTMLSpanElement;

const passwordError = document.getElementById(
  "passwordErrorMessage"
) as HTMLSpanElement;

const confirmPasswordError = document.getElementById(
  "confirmPasswordErrorMessage"
) as HTMLSpanElement;

//Buttons
const registerBtn = document.getElementById(
  "register-btn"
) as HTMLButtonElement;
registerBtn.onclick = OnRegister;

const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
loginBtn.onclick = OnLogin;

firebase.UserStateChanged(statusChange);

//Events
function OnEmailChanged() {
  const message = util.validateEmailMessage(email.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  util.changeSpanLayout(emailError, message, display);
  toggleButton();
}
function OnPasswordChanged() {
  const message = util.validatePasswordMessage(password.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  util.changeSpanLayout(passwordError, message, display);

  comparePassword();
  toggleButton();
}
function OnConfirmPasswordChanged() {
  comparePassword();
  toggleButton();
}
async function OnRegister(e: any) {
  loading.showLoading();

  const model = await firebase.RegisterNewUser(email.value, password.value);
  if (model.result) {
    window.location.href = "home.html";
  } else {
    alert(model.message);
  }

  loading.hideLoading();

  return false;
}
function OnLogin() {
  window.location.href = "../index.html";
}
function statusChange(user: User) {
  window.location.href = "home.html";
}

//Methods
function comparePassword() {
  const message = util.comparePasswordMessage(
    confirm_password.value,
    password.value
  );
  const check = message.length > 0;
  const display = check ? "block" : "none";
  util.changeSpanLayout(confirmPasswordError, message, display);
}
function toggleButton() {
  const checkEmail = util.validateEmail(email.value);
  const checkPassword = util.validatePassword(password.value);
  const compare = password.value === confirm_password.value;

  registerBtn.disabled = !(checkEmail && checkPassword && compare);
}
