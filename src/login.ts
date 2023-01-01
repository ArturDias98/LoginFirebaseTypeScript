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

function Default() {
  toggleButtons();
}
//Raises when input value changes.
function OnEmailChanged() {
  toggleButtons();

  emailError.style.display = !email.value ? "block" : "none";
  emailError.innerText = !email.value ? "Email is required" : "";
}

function OnPasswordChanged() {
  toggleButtons();
  passwordError.style.display = !password.value ? "block" : "none";
  passwordError.innerText = !password.value ? "Password is required" : "";
}

function validateEmail(): boolean {
  return /\S+@\S+\.\S+/.test(email.value);
}

function validatePassword(): boolean {
  if (!password.value) {
    return false;
  }
  return true;
}

function toggleButtons() {
  recoveryBtn.disabled = !validateEmail();
  loginBtn.disabled = !validateEmail() || !validatePassword();
}

const Form = {
  default: Default,
};

export { Form };
