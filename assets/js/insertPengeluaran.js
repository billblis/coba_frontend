// insertPengeluaran.js

import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js";
import { fetchData } from './getSisaSaldo.js';

const insertPengeluaran = async () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPengeluaran";
    const tokenkey = "Authorization";
    const tokenvalue = getCookie("Authorization");

    try {
        // Fetch data for calculating the remaining balance
        const pemasukanData = await fetchData("https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan");
        const pengeluaranData = await fetchData("https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran");

        const pemasukan = pemasukanData.reduce((sum, item) => sum + (item.jumlah_masuk || 0), 0);
        const pengeluaran = pengeluaranData.reduce((sum, item) => sum + (item.jumlah_keluar || 0), 0);
        const remainingAmount = pemasukan - pengeluaran;

        const jumlahKeluar = parseInt(getValue("jumlah_keluar"));

        // Check if the expense amount exceeds the remaining balance
        if (jumlahKeluar > remainingAmount) {
            Swal.fire({
                icon: "error",
                title: "Saldo Tidak Cukup",
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

        // Continue with the insertion if the balance is sufficient
        postWithToken(target_url, tokenkey, tokenvalue, data, responseData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
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
