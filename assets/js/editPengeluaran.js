// // editPengeluaran.js
// export const isiData = (results) => {
//     const dataPengeluaran = [
//         { id: "tanggal_keluar", path: "data.0.tanggal_keluar" },
//         { id: "jumlah_keluar", path: "data.0.jumlah_keluar" },
//         { id: "sumber", path: "data.0.sumber" },
//         { id: "deskripsi", path: "data.0.deskripsi" },
//     ];

//     dataPengeluaran.forEach(({ id, path, index, property }) => {
//         const inputElement = document.getElementById(id);
//         const value = getNestedValue(results, path, index, property);
//         inputElement.value = value;
//     });
// }

// const getNestedValue = (obj, path, index, property) => {
//     const value = path
//         .split(".")
//         .reduce((value, key) => (value && value[key] !== undefined ? value[key] : ""), obj);

//     if (
//         Array.isArray(value) &&
//         value.length > index &&
//         value[index].hasOwnProperty(property)
//     ) {
//         return value[index][property];
//     }

//     return value;
// };

// // fetchEditPengeluaran.js
// import { isiData } from "./editPengeluaran.js";
// import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

// const urlParams = new URLSearchParams(window.location.search);
// const _id = urlParams.get("_id");

// const urlFetch = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getPengeluaranFromID?_id=" + _id;

// function getPengeluaranFromID(target_url, responseFunction) {
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", getCookie("Authorization"));

//     var requestOptions = {
//         method: "GET",
//         headers: myHeaders,
//         redirect: "follow",
//     };

//     fetch(target_url, requestOptions)
//         .then((response) => response.text())
//         .then((result) => responseFunction(JSON.parse(result)))
//         .catch((error) => console.log("error", error));
// }

// getPengeluaranFromID(urlFetch, isiData);

// // Add validation for expense amount not exceeding income amount
// document.getElementById("jumlah_keluar").addEventListener("input", function () {
//     const incomeAmount = parseFloat(document.getElementById("jumlah_pemasukan").value) || 0;
//     const expenseAmount = parseFloat(this.value) || 0;

//     if (expenseAmount > incomeAmount) {
//         alert("Saldo tidak cukup. Jumlah pengeluaran tidak boleh lebih dari jumlah pemasukan.");
//         this.value = incomeAmount; // Set expense amount to income amount
//     }
// });

// editPengeluaran.js
export const isiData = (results) => {
  const dataPengeluaran = [
      { id: "tanggal_keluar", path: "data.0.tanggal_keluar" },
      { id: "jumlah_keluar", path: "data.0.jumlah_keluar" },
      { id: "sumber", path: "data.0.sumber" },
      { id: "deskripsi", path: "data.0.deskripsi" },
  ];

  dataPengeluaran.forEach(({ id, path, index, property }) => {
      const inputElement = document.getElementById(id);
      const value = getNestedValue(results, path, index, property);
      inputElement.value = value;
  });
}

const getNestedValue = (obj, path, index, property) => {
  const value = path
      .split(".")
      .reduce((value, key) => (value && value[key] !== undefined ? value[key] : ""), obj);

  if (
      Array.isArray(value) &&
      value.length > index &&
      value[index].hasOwnProperty(property)
  ) {
      return value[index][property];
  }

  return value;
};

// fetchEditPengeluaran.js
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

// Add validation for expense amount not exceeding income amount
document.getElementById("jumlah_keluar").addEventListener("input", function () {
  const incomeAmount = parseFloat(document.getElementById("jumlah_pemasukan").value) || 0;
  const expenseAmount = parseFloat(this.value) || 0;

  if (expenseAmount > incomeAmount) {
      alert("Saldo tidak cukup. Jumlah pengeluaran tidak boleh lebih dari jumlah pemasukan.");
      this.value = incomeAmount; // Set expense amount to income amount
  }
});

