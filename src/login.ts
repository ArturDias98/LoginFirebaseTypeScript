export class Form {
  //Buttons
  private loginBtn = document.getElementById("login-btn") as HTMLButtonElement;
  private recoveryBtn = document.getElementById(
    "recoveryBtn"
  ) as HTMLButtonElement;

  //Inputs
  private email = document.getElementById("emailInput") as HTMLInputElement;
  private password = document.getElementById(
    "passwordInput"
  ) as HTMLInputElement;

  //Span messages
  private emailError = document.getElementById(
    "emailErrorMessage"
  ) as HTMLSpanElement;
  private passwordError = document.getElementById(
    "passwordErrorMessage"
  ) as HTMLSpanElement;

  constructor() {
    this.loginBtn.disabled = true;
    this.recoveryBtn.disabled = true;

    this.email.oninput = this.OnEmailChanged;
    this.password.oninput = this.OnPasswordChanged;
  }

  private OnEmailChanged() {
    this.toggleButtons();
    this.emailError.style.display = !this.email.value ? "block" : "none";
    this.emailError.innerText = !this.email.value ? "Email is required" : "";
  }
  private OnPasswordChanged() {
    this.toggleButtons();
    this.passwordError.style.display = !this.password.value ? "block" : "none";
    this.passwordError.innerText = !this.password.value ? "Password is required" : "";
  }

  private validateEmail(): boolean {
    return /\S+@\S+\.\S+/.test(this.email.value);
  }
  
  private validatePassword(): boolean {
    if (!this.password.value) {
      return false;
    }
    return true;
  }
  
  private toggleButtons() {
    this.recoveryBtn.disabled = !this.validateEmail();
    this.loginBtn.disabled = !this.validateEmail() || !this.validatePassword();
  }

}
