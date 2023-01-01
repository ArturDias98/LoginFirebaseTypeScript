//Email is not valid.

export function validateEmail(value: string): string {
  if (!value) {
    return "Email is required";
  }
  return /\S+@\S+\.\S+/.test(value) ? "" : "Email not valid";

  //return /\S+@\S+\.\S+/.test(value);
}
export function validatePassword(value: string): string {
    if(!value){
        return "Password is required";
    }
    return value.length < 4 ? "Password not valid" : "";
}
/*export function validateEmail(value: string): boolean {
  return /\S+@\S+\.\S+/.test(value);
}
//Email must be specified.
export function checkEmail(value: string): boolean {
  if (!value) return false;
  return true;
}
//Password is not valid.
export function validatePassword(value: string): boolean {
  if (value.length < 4) return false;

  return true;
}
export function checkPassword(value: string) {
  if (!value) return false;

  return true;
}*/
