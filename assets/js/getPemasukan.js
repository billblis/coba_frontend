import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
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

        // Iterate through the data and add rows to the table
        result.data.forEach(dataPemasukan);

        console.log(result);
    }
}

const rCardPemasukan = (result) => {
    if (result.status === true) {
        // Calculate the total sum of jumlah_masuk
        const totalPemasukan = result.data.reduce((sum, item) => sum + item.jumlah_masuk, 0);

        // Update the HTML element with the calculated sum
        document.getElementById('incomeCounter').innerText = `Rp. ${totalPemasukan}`;

        // // Iterate through the data and add rows to the table
        result.data.forEach(dataPemasukan);

        console.log(result);
    }
}


getWithToken(target_url, responseData);
getWithToken(target_url, rCardPemasukan);