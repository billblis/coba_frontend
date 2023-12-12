import { isiData } from "./editPemasukan.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const urlParams = new URLSearchParams(window.location.search);
const _id = urlParams.get("_id");

const urlFetch = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getPemasukanFromID?_id=" + _id;

function getPemasukanFromID(target_url, responseFunction) {
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

getPemasukanFromID(urlFetch, isiData);