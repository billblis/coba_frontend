import { isiData } from "./editPengeluaran.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const urlParams = new URLSearchParams(window.location.search);
const _id = urlParams.get("_id");

const urlFetch = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getPengeluaranFromID?_id=" + _id;

function getPengeluaranFromID(target_url, responseFunction) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", getCookie("Authorization"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => responseFunction(JSON.parse(result)))
    .catch((error) => console.log("error", error));
}

getPengeluaranFromID(urlFetch, isiData);