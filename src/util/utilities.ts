//Email is not valid.
export function validateEmailMessage(value: string): string {
  if (!value) {
    return "Email is required";
  }
  return validateEmail(value) ? "" : "Email not valid";
}

export function validatePasswordMessage(value: string): string {
  if (!value) {
    return "Password is required";
  }
  return !validatePassword(value) ? "Password not valid" : "";
}

export function validateEmail(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}

export function validatePassword(value: string): boolean {
  if (value.length < 4) return false;

  return true;
}
