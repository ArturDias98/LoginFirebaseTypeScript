const loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
loginBtn.disabled = true;
loginBtn.onclick = LogInClick;

const recoveryBtn = document.getElementById("recoveryBtn") as HTMLButtonElement;
recoveryBtn.disabled = true;

const email = document.getElementById("emailInput") as HTMLInputElement;
email.oninput = OnInputChanged;

const password = document.getElementById("passwordInput") as HTMLInputElement;
password.oninput = OnInputChanged;

const emailError = document.getElementById("emailErrorMessage") as HTMLDivElement;
const passwordError = document.getElementById("passwordErrorMessage") as HTMLDivElement;

//Raises when input value changes.
function OnInputChanged() {
  recoveryBtn.disabled = !validateEmail();
  loginBtn.disabled = !validateEmail() || !validatePassword();

  emailError.style.display = !email.value ? "block" : "none";
  emailError.innerText = !email.value ? "Email is required":  "";

  passwordError.style.display = !password.value ? "block" : "none";
  passwordError.innerText = !password.value ? "Password is required":  "";

}

function LogInClick() {}

function validateEmail(): boolean {
  return /\S+@\S+\.\S+/.test(email.value);
}

function validatePassword(): boolean {
  if (!password.value) {
    return false;
  }
  return true;
}
