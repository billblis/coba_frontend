import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

import { setPieChart } from './charts-pie.js'
import { setBarChart } from './charts-bars.js'

import { target_url as url_pemasukan } from './getPemasukan.js'
import { target_url as url_pengeluaran } from './getPengeluaran.js'

// Function to format number as IDR
function formatRupiah(amount) {
    const formattedAmount = amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
    return formattedAmount;
}

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
        const remainingAmountValue = pemasukan - pengeluaran;
        
        const formattedRemainingAmount = formatRupiah(remainingAmountValue);

        setPieChart(pemasukan, pengeluaran);
        setBarChart(pemasukanData, pengeluaranData);
        $('#remainingAmount').html(formattedRemainingAmount);

        return remainingAmountValue;
    } catch (error) {
        console.error('Error updating remaining amount:', error);
    }
}

remainingAmount();
