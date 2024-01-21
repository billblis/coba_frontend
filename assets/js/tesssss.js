import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js"

const insertPengeluaran = () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPengeluaran"
    const tokenkey = "Authorization";
    const tokenvalue = getCookie("Authorization");

    const data = {
        "tanggal_keluar": getValue("tanggal_keluar"),
        "jumlah_keluar": parseInt(getValue("jumlah_keluar")),
        "sumber": getValue("sumber"),
        "deskripsi": getValue("deskripsi"),
    }

    postWithToken(target_url, tokenkey, tokenvalue, data, responseData)
}

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
}

const btnInsert = document.getElementById("btnInsert");

btnInsert.addEventListener("click", insertPengeluaran);


//sisa saldo
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

import { setPieChart } from './charts-pie.js'
import { setBarChart } from './charts-bars.js'

import { target_url as url_pemasukan } from './getPemasukan.js'
import { target_url as url_pengeluaran } from './getPengeluaran.js'

export async function fetchData(url) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

async function remainingAmount() {
    try {
        const pemasukanData = await fetchData(url_pemasukan);
        const pengeluaranData = await fetchData(url_pengeluaran);

        const pemasukan = pemasukanData.reduce((sum, item) => sum + (item.jumlah_masuk || 0), 0);
        const pengeluaran = pengeluaranData.reduce((sum, item) => sum + (item.jumlah_keluar || 0), 0);
        const remainingAmount = pemasukan - pengeluaran;

        setPieChart(pemasukan, pengeluaran)
        setBarChart(pemasukanData, pengeluaranData)
        $('#remainingAmount').html(`Rp. ${remainingAmount}`);

        return remainingAmount
    } catch (error) {
        console.error('Error updating remaining amount:', error);
    }
}

remainingAmount();