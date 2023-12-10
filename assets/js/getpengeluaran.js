import {getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { formPengeluaran } from "./table.js";
// // import { showLoadingModal, hideLoadingModal } from "./utilities/loading.js"
// // import { tabelTopic } from "./temp/table.js";

function getWithToken(target_url, responseFunction) {
    const myHeaders = new Headers();
    myHeaders.append("token", getCookie("token"));

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

const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getPengeluaranFromID";

const dataPengeluaran  = (value) => {
    const data = formPengeluaran
    .replace("#TANGGAL_KELUAR#", value.tanggal_pengeluaran)
    .replace("#JUMLAH_KELUAR#", value.jumlah_keluar)
    .replace("#SUMBER#", value.sumber)
    .replace("#DESKRIPSI#", value.deskripsi);

    addInner("tablePengeluaran", data);
}


const responseData = (result) => {
    if (result.status === true) {
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

getWithToken(target_url, responseData);