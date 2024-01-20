// insertPengeluaran.js

import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { fetchData } from './getSisaSaldo.js'; // Import the fetchData function from getSaldo.js

const insertPengeluaran = async () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPengeluaran";
    const tokenkey = "Authorization";
    const tokenvalue = getCookie("Authorization");

    // Fetch the remaining amount before attempting to insert
    const remainingAmount = await fetchData("https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getSaldo");

    const jumlahKeluar = parseInt(getValue("jumlah_keluar"));

    // Check if the expense amount exceeds the remaining balance
    if (jumlahKeluar > remainingAmount) {
        Swal.fire({
            icon: "error",
            title: "Insufficient Balance",
            text: "You don't have enough balance for this expense.",
        });
        return;
    }

    const data = {
        "tanggal_keluar": getValue("tanggal_keluar"),
        "jumlah_keluar": jumlahKeluar,
        "sumber": getValue("sumber"),
        "deskripsi": getValue("deskripsi"),
    };

    postWithToken(target_url, tokenkey, tokenvalue, data, responseData);
};

const responseData = (result) => {
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Insert Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "pengeluaran.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Insert Failed",
            text: result.message,
        });
    }
};

const btnInsert = document.getElementById("btnInsert");

btnInsert.addEventListener("click", insertPengeluaran);
