import {getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { formPemasukan } from "./table.js";

function getWithToken(target_url, responseFunction) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";

const dataPemasukan  = (value) => {
    document.getElementById("jmlpemasukan").innerHTML =
    "" + MyvarMahasiswa.length + " Data";
    const data = formPemasukan
    .replace("#TANGGAL_MASUK#", value.tanggal_masuk)
    .replace("#JUMLAH_MASUK#", value.jumlah_masuk)
    .replace("#SUMBER#", value.sumber)
    .replace("#DESKRIPSI#", value.deskripsi)
    .replace("#IDEDIT#", value._id)
    .replace("#IDHAPUS#", value._id)
    .replace("#DELETE#", value._id);

    addInner("tablePemasukan", data);
}


const responseData = (result) => {
    if (result.status === true) {
        let totalIncome = 0;

        result.data.forEach((value) => {
            dataPemasukan(value);
            totalIncome += value.jumlah_masuk;
        });

        // Update the total income in the HTML element
        const totalIncomeElement = document.getElementById("totalIncome");
        if (totalIncomeElement) {
            totalIncomeElement.textContent = `Rp. ${totalIncome}`;
        }

        console.log(result);
    }
}

getWithToken(target_url, responseData);


