// card.js
import { getWithToken } from "./api.js";
import { formPemasukan, formPengeluaran } from "./table.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { calculateRemainingBalance } from "./calculator.js";

const targetUrlPemasukan = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";
const targetUrlPengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

// Function to get data with token
function getDataWithToken(targetUrl, responseFunction) {
    getWithToken(targetUrl, (result) => {
        if (result.status === true) {
            responseFunction(result.data);
        }
    });
}

// Function to display pemasukan
const displayPemasukan = (value) => {
    const data = formPemasukan
        .replace("#TANGGAL_MASUK#", value.tanggal_masuk)
        .replace("#JUMLAH_MASUK#", value.jumlah_masuk)
        .replace("#SUMBER#", value.sumber)
        .replace("#DESKRIPSI#", value.deskripsi)
        .replace("#IDEDIT#", value._id)
        .replace("#IDHAPUS#", value._id)
        .replace("#DELETE#", value._id);

    addInner("tablePemasukan", data);
};

// Function to display pengeluaran
const displayPengeluaran = (value) => {
    const data = formPengeluaran
        .replace("#TANGGAL_KELUAR#", value.tanggal_keluar)
        .replace("#JUMLAH_KELUAR#", value.jumlah_keluar)
        .replace("#SUMBER#", value.sumber)
        .replace("#DESKRIPSI#", value.deskripsi)
        .replace("#IDEDIT#", value._id)
        .replace("#IDHAPUS#", value._id)
        .replace("#DELETE#", value._id);

    addInner("tablePengeluaran", data);
};

// Function to display total pemasukan in card
const displayTotalPemasukan = (dataPemasukan) => {
    const totalPemasukan = dataPemasukan.reduce((sum, item) => sum + item.jumlah_masuk, 0);
    document.getElementById('incomeCounter').innerText = `Rp. ${totalPemasukan}`;
    return totalPemasukan;
};

// Function to display total pengeluaran in card
const displayTotalPengeluaran = (dataPengeluaran) => {
    const totalPengeluaran = dataPengeluaran.reduce((sum, item) => sum + item.jumlah_keluar, 0);
    document.getElementById('expensesCounter').innerText = `Rp. ${totalPengeluaran}`;
    return totalPengeluaran;
};

// Function to display remaining balance in card
const displayRemainingBalance = (totalPemasukan, totalPengeluaran) => {
  const remainingBalance = calculateRemainingBalance(totalPemasukan, totalPengeluaran);
  console.log("Remaining Balance:", remainingBalance);

  const remainingBalanceElement = document.getElementById('remainingBalance');
  if (remainingBalanceElement) {
    remainingBalanceElement.innerText = `Rp. ${remainingBalance}`;

    // Show alert if remaining balance is negative
    if (remainingBalance < 0) {
      alert('Saldo tidak mencukupi!');
    }
  } else {
    console.error("Element with ID 'remainingBalance' not found");
  }
};

// Get pemasukan data and display it
getDataWithToken(targetUrlPemasukan, (resultPemasukan) => {
    resultPemasukan.forEach(displayPemasukan);
    const totalPemasukan = displayTotalPemasukan(resultPemasukan);
  
    // Mendapatkan data pengeluaran setelah mendapatkan data pemasukan
    getDataWithToken(targetUrlPengeluaran, (resultPengeluaran) => {
      resultPengeluaran.forEach(displayPengeluaran);
      const totalPengeluaran = displayTotalPengeluaran(resultPengeluaran);
  
      // Menampilkan sisa saldo
      displayRemainingBalance(totalPemasukan, totalPengeluaran);
    });
  });
