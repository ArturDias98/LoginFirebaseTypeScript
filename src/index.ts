import * as util from "./util/utilities";
import * as firebase from "./util/utilFirebase";
import * as loading from "./loading";
import { User } from "firebase/auth";

const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
loginBtn.onclick = loginClick;
const recoveryBtn = document.getElementById("recoveryBtn") as HTMLButtonElement;
recoveryBtn.onclick = recoveryClick;
const registerBtn = document.getElementById(
  "newAccount-btn"
) as HTMLButtonElement;
registerBtn.onclick = registerClick;

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

firebase.UserStateChanged(statusChange);

//Raises when input value changes.
function OnEmailChanged() {
  toggleButtons();

  const message = util.validateEmailMessage(email.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  util.changeSpanLayout(emailError, message, display);
}
function OnPasswordChanged() {
  toggleButtons();

  const message = util.validatePasswordMessage(password.value);
  const check = message.length > 0;
  const display = check ? "block" : "none";
  util.changeSpanLayout(passwordError, message, display);
}
function toggleButtons() {
  const checkEmail = !util.validateEmail(email.value);
  const checkPassword = !util.validatePassword(password.value);

  recoveryBtn.disabled = checkEmail;
  loginBtn.disabled = checkEmail || checkPassword;
}

function statusChange(user: User) {
  window.location.href = "pages/home.html";
}
async function loginClick() {
  loading.showLoading();

  const model = await firebase.Login(email.value, password.value);
  if (model.result) {
    window.location.href = "pages/home.html";
  } else {
    alert(model.message);
  }

  loading.hideLoading();
}
async function recoveryClick() {
  loading.showLoading();
  const model = await firebase.RequestEmail(email.value);
  if (!model.result) {
    alert(model.message);
  }
  loading.hideLoading();
}
function registerClick() {
  window.location.href = "pages/register.html";
}

/*For html script
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBIQVYhOEl6rnitC9HCe564NUw1NdZC810",
    authDomain: "login-671f2.firebaseapp.com",
    projectId: "login-671f2",
    storageBucket: "login-671f2.appspot.com",
    messagingSenderId: "20202641939",
    appId: "1:20202641939:web:fa3285c1a32c621759bde6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
*/
