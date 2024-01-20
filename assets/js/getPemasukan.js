import { getCookie } from 'https://jscroot.github.io/cookie/croot.js';
import { addInner } from 'https://jscroot.github.io/element/croot.js';
import { formPemasukan } from './table.js';

// Function to format number as IDR
function formatRupiah(amount) {
    const formattedAmount = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    return formattedAmount;
}

export function getWithToken(target_url, responseFunction) {
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

export const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";

const dataPemasukan = (value) => {
    const formattedJumlahMasuk = formatRupiah(value.jumlah_masuk);

    const data = formPemasukan
        .replace("#TANGGAL_MASUK#", value.tanggal_masuk)
        .replace("#JUMLAH_MASUK#", formattedJumlahMasuk)
        .replace("#SUMBER#", value.sumber)
        .replace("#DESKRIPSI#", value.deskripsi)
        .replace("#IDEDIT#", value._id)
        .replace("#IDHAPUS#", value._id)
        .replace("#DELETE#", value._id);

    addInner("tablePemasukan", data);
}

const responseData = (result) => {
    if (result.status === true) {
        result.data.forEach(dataPemasukan);
        console.log(result);
    }
}

const rCardPemasukan = (result) => {
    if (result.status === true) {
        const totalPemasukan = result.data.reduce((sum, item) => sum + item.jumlah_masuk, 0);
        const formattedTotalPemasukan = formatRupiah(totalPemasukan);

        document.getElementById('incomeCounter').innerText = formattedTotalPemasukan;

        result.data.forEach(dataPemasukan);
        console.log(result);
    }
}

getWithToken(target_url, responseData);
getWithToken(target_url, rCardPemasukan);
