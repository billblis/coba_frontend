import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { formPemasukan } from "./table.js";
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

const target_url_pemasukan = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";

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


const responseDataPemasukan = (result) => {
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

const target_url_pengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

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


const responseDataPengeluaran = (result) => {
    if (result.status === true) {
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

const rCardPengeluaran = (result) => {
    if (result.status === true) {
        // Calculate the total sum of jumlah_masuk
        const totalPengeluaran = result.data.reduce((sum, item) => sum + item.jumlah_keluar, 0);

        // Update the HTML element with the calculated sum
        document.getElementById('expensesCounter').innerText = `Rp. ${totalPengeluaran}`;

        // // Iterate through the data and add rows to the table
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

const updateRemainingAmount = (resultIncome, resultExpense) => {
    if (resultIncome.status === true && resultExpense.status === true) {
        const totalIncome = resultIncome.data.reduce((sum, item) => sum + item.jumlah_masuk, 0);
        const totalExpenses = resultExpense.data.reduce((sum, item) => sum + item.jumlah_keluar, 0);

        // Update the HTML elements with the calculated sums
        document.getElementById('incomeCounter').innerText = `Rp. ${totalIncome}`;
        document.getElementById('expensesCounter').innerText = `Rp. ${totalExpenses}`;

        const remainingAmount = totalIncome - totalExpenses;

        // Update the HTML element with the remaining amount
        document.getElementById('remainingAmount').innerText = `Rp. ${remainingAmount}`;

        resultIncome.data.forEach(dataPemasukan);
        resultExpense.data.forEach(dataPengeluaran);

        console.log(resultIncome);
        console.log(resultExpense);
    }
}

// Fetch income and expense data, then update remaining amount
// Promise.all([fetchIncomeData(), fetchExpenseData()])
//     .then(([resultIncome, resultExpense]) => {
//         updateRemainingAmount(resultIncome, resultExpense);
//     })
//     .catch(error => console.error('Error fetching data:', error));

getWithToken(target_url_pemasukan, responseDataPemasukan);
getWithToken(target_url_pemasukan, rCardPemasukan);
getWithToken(target_url_pengeluaran, responseDataPengeluaran);
getWithToken(target_url_pengeluaran, rCardPengeluaran);
getWithToken(target_url_pengeluaran, updateRemainingAmount);
getWithToken(target_url_pemasukan, updateRemainingAmount);