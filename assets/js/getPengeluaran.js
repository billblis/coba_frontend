import {getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { formPengeluaran } from "./table.js";

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

const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

const dataPengeluaran  = (value) => {
    const data = formPengeluaran
    .replace("#TANGGAL_KELUAR#", value.tanggal_keluar)
    .replace("#JUMLAH_KELUAR#", value.jumlah_keluar)
    .replace("#SUMBER#", value.sumber)
    .replace("#DESKRIPSI#", value.deskripsi)
    .replace("#IDEDIT#", value._id)
    .replace("#IDHAPUS#", value._id)
    .replace("#DELETE#", value._id);

    addInner("tablePengeluaran", data);
}


const responseData = (result) => {
    if (result.status === true) {
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

getWithToken(target_url, responseData);