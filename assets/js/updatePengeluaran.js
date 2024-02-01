import { getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { fetchData } from './getSisaSaldo.js';

const today = new Date().toISOString().split('T')[0];

// Set the max attribute of the date input field to today's date
document.getElementById("tanggal_keluar").setAttribute("max", today);

const putData = (target_url, data, responseFunction) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const responseData = (result) => {
    console.log("Server Response:", result, result.status);
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Update Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "pengeluaran.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: result.message,
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btnUpdates = document.getElementById("btnUpdate");

    btnUpdates.addEventListener("click", () => {
        console.log("button aktif");
        updatePengeluaran();
    });

    async function updatePengeluaran() {
        const urlParams = new URLSearchParams(window.location.search);
        const _id = urlParams.get("_id");

        console.log("pengeluaranID:", _id);

        const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/updatePengeluaran?_id=" + _id;

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
                text: "Jumlah pengeluaran tidak boleh lebih dari jumlah pemasukan.",
            });
            return;
        }

        const data = {
            "tanggal_keluar": getValue("tanggal_keluar"),
            "jumlah_keluar": jumlahKeluar,
            "sumber": getValue("sumber"),
            "deskripsi": getValue("deskripsi"),
        };
            // Continue with the update if the balance is sufficient
            putData(target_url, data, responseData);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
});
