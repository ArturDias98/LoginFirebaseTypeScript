export function showLoading() {
  const div = document.createElement("div") as HTMLDivElement;
  div.classList.add("loading", "centralize");

  const label = document.createElement("label") as HTMLLabelElement;
  label.innerText = "Loading...";

  div.appendChild(label);

  document.body.appendChild(div);

  setTimeout(() => hideLoading(), 2000);
}
export function hideLoading() {
  const loadings = document.getElementsByClassName("loading");
  if (loadings.length) {
    loadings[0].remove();
  }
}
