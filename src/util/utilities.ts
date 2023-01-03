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
export function comparePasswordMessage(value: string, compareValue: string) {
  if (!value) return "";
  return value === compareValue ? "" : "Password doesn't match";
}
export function validateEmail(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}
export function validatePassword(value: string): boolean {
  if (value.length < 4) return false;

  return true;
}
export function firebaseErrorMessages(error: any) {
  switch (error) {
    case "auth/user-not-found":
      return "User not found";

    case "auth/wrong-password":
      return "Wrong password";

    case "auth/user-not-found":
      return "User not found";

    case "auth/network-request-failed":
      return "Network request failed";
    default:
      return "Unknown";
  }
}
export function changeSpanLayout(
  span: HTMLSpanElement,
  message: string,
  mode: string
) {
  span.style.display = mode;
  span.style.color = "orangered";
  span.innerText = message;
}
