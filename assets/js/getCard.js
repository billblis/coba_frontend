// Definisi fungsi getWithToken
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

// Kode untuk pengeluaran
const target_url_pengeluaran = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPengeluaran";

const dataPengeluaran = (value) => {
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
        // Iterate through the data and add rows to the table
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

const rCardPengeluaran = (result) => {
    if (result.status === true) {
        // Calculate the total sum of jumlah_keluar
        const totalPengeluaran = result.data.reduce((sum, item) => sum + item.jumlah_keluar, 0);

        // Update the HTML element with the calculated sum
        document.getElementById('expensesCounter').innerText = `Rp. ${totalPengeluaran}`;

        // // Iterate through the data and add rows to the table
        result.data.forEach(dataPengeluaran);

        console.log(result);
    }
}

// Kode untuk pemasukan
const target_url_pemasukan = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/getAllPemasukan";

const dataPemasukan = (value) => {
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

        // Panggil fungsi untuk menghitung sisa saldo
        calculateRemainingBalance(totalPemasukan, result.data);
        
        console.log(result);
    }
}

// Fungsi untuk menghitung sisa saldo
function calculateRemainingBalance(totalPemasukan, dataPengeluaran) {
    const totalPengeluaran = dataPengeluaran.reduce((sum, item) => sum + item.jumlah_keluar, 0);
    const remainingBalance = totalPemasukan - totalPengeluaran;

    // Update HTML element with the calculated remaining balance
    document.getElementById('remainingBalance').innerText = `Rp. ${remainingBalance}`;

    // Tampilkan alert jika saldo tidak mencukupi
    if (remainingBalance < 0) {
        alert('Saldo tidak mencukupi!');
    }
}

// Panggil API untuk pengeluaran dan pemasukan
getWithToken(target_url_pengeluaran, responseDataPengeluaran);
getWithToken(target_url_pengeluaran, rCardPengeluaran);
getWithToken(target_url_pemasukan, responseDataPemasukan);
getWithToken(target_url_pemasukan, rCardPemasukan);
