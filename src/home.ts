import * as firebase from "./util/utilFirebase";

const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
logoutBtn.onclick = OnLogout;

firebase.AuthGuard("../index.html");

async function OnLogout() {
  const _result = await firebase.LogOut();
  if (!_result.result) {
    alert(_result.message);
    return;
  }
  window.location.href = "../index.html";
}
