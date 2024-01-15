import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const target_url_pengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

const pengeluaranCount = (count) => {
    const resultCountElement = document.getElementById("pengeluaranCount");
    resultCountElement.innerHTML = `<td class="px-4 py-3 text-sm">${count}</td>`;  
  };

  const getPengeluaran = (target_url) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(target_url, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const jsonData = JSON.parse(result);
      const lenghtPengeluaranCount = jsonData["data"].length;
      pengeluaranCount(lenghtPengeluaranCount);
    })
    .catch((error) => console.log("error", error));
};
getPengeluaran(target_url_pengeluaran);
  