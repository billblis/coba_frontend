/**
 * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
 */
import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js/dist/chart.esm.min.js';
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { addInner } from "https://jscroot.github.io/element/croot.js";
import { formPemasukan } from "./table.js";
import { formPengeluaran } from "./table.js";

// Function to get data with token
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

// Pemasukan
const targetUrlPemasukan = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";

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

const rCardPemasukan = (result) => {
    if (result.status === true) {
        const totalPemasukan = result.data.reduce((sum, item) => sum + item.jumlah_masuk, 0);
        document.getElementById('incomeCounter').innerText = `Rp. ${totalPemasukan}`;
        result.data.forEach(dataPemasukan);
        console.log(result);
    }
}

getWithToken(targetUrlPemasukan, rCardPemasukan);

// Pengeluaran
const targetUrlPengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

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

const rCardPengeluaran = (result) => {
    if (result.status === true) {
        const totalPengeluaran = result.data.reduce((sum, item) => sum + item.jumlah_keluar, 0);
        document.getElementById('expensesCounter').innerText = `Rp. ${totalPengeluaran}`;
        result.data.forEach(dataPengeluaran);
        createPieChart(totalPemasukan, totalPengeluaran);
        console.log(result);
    }
}

getWithToken(targetUrlPengeluaran, rCardPengeluaran);

// Function to create the pie chart
function createPieChart(totalPemasukan, totalPengeluaran) {
  const pieConfig = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [totalPemasukan, totalPengeluaran],
          backgroundColor: ['#1c64f2', '#dc3545'], // Blue for income, red for expenses
          label: 'Dataset 1',
        },
      ],
      labels: ['Pemasukan', 'Pengeluaran'],
    },
    options: {
      responsive: true,
      cutoutPercentage: 80,
      legend: {
        display: false,
      },
    },
  };

  const pieCtx = document.getElementById('pie');
  window.myPie = new Chart(pieCtx, pieConfig);
}


// /**
//  * For usage, visit Chart.js docs https://www.chartjs.org/docs/latest/
//  */
// const pieConfig = {
//   type: 'doughnut',
//   data: {
//     datasets: [
//       {
//         data: [ 33, 33],
//         /**
//          * These colors come from Tailwind CSS palette
//          * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
//          */
//         backgroundColor: [ '#1c64f2', ' #dc3545'],
//         label: 'Dataset 1',
//       },
//     ],
//     labels: [ 'Shirts', 'Bags'],
//   },
//   options: {
//     responsive: true,
//     cutoutPercentage: 80,
//     /**
//      * Default legends are ugly and impossible to style.
//      * See examples in charts.html to add your own legends
//      *  */
//     legend: {
//       display: false,
//     },
//   },
// }

// // change this to the id of your chart element in HMTL
// const pieCtx = document.getElementById('pie')
// window.myPie = new Chart(pieCtx, pieConfig)
