// common.js
import { getWithToken } from "./api.js";
import { addInner, formPemasukan, formPengeluaran } from "./table.js";
import { calculateRemainingBalance } from "./calculator.js";

const targetUrlPemasukan = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";
const targetUrlPengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

// Fungsi untuk mendapatkan data dengan token
function getDataWithToken(targetUrl, responseFunction) {
    getWithToken(targetUrl, (result) => {
        if (result.status === true) {
            responseFunction(result.data);
        }
    });
}

// Fungsi untuk menampilkan data pemasukan ke tabel
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

// Fungsi untuk menampilkan data pengeluaran ke tabel
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

// Fungsi untuk menampilkan total pemasukan di card
const displayTotalPemasukan = (dataPemasukan) => {
    const totalPemasukan = dataPemasukan.reduce((sum, item) => sum + item.jumlah_masuk, 0);
    document.getElementById('incomeCounter').innerText = `Rp. ${totalPemasukan}`;
    return totalPemasukan;
};

// Fungsi untuk menampilkan total pengeluaran di card
const displayTotalPengeluaran = (dataPengeluaran) => {
    const totalPengeluaran = dataPengeluaran.reduce((sum, item) => sum + item.jumlah_keluar, 0);
    document.getElementById('expensesCounter').innerText = `Rp. ${totalPengeluaran}`;
    return totalPengeluaran;
};

// Fungsi untuk menampilkan sisa saldo di card
const displayRemainingBalance = (totalPemasukan, totalPengeluaran) => {
    const remainingBalance = calculateRemainingBalance(totalPemasukan, totalPengeluaran);
    document.getElementById('remainingBalance').innerText = `Rp. ${remainingBalance}`;

    // Tampilkan alert jika saldo tidak mencukupi
    if (remainingBalance < 0) {
        alert('Saldo tidak mencukupi!');
    }
};

// Mendapatkan data pemasukan dan menampilkannya
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
