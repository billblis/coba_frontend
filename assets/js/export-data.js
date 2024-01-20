import { target_url as url_pemasukan } from './getPemasukan.js'
import { target_url as url_pengeluaran } from './getPengeluaran.js'
import { fetchData } from './getSisaSaldo.js';

function handleDownloadExcel(
    filename,
    pemasukan,
    pengeluaran,
    remaining,
    header,
    counter
) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    var row = counter
    header.map(el => XLSX.utils.sheet_add_aoa(ws, [[el.name]], { origin: el.origin }))

    if (filename == "pemasukan" || filename == "pemasukan_dan_pengeluaran") {
        pemasukan.map(el => {
            XLSX.utils.sheet_add_aoa(ws, [[el._id]], { origin: `A${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.tanggal_masuk]], { origin: `B${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.jumlah_masuk]], { origin: `C${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.sumber]], { origin: `D${row}` })
            row++
        })

        XLSX.utils.sheet_add_aoa(ws, [['Sisa Uang']], { origin: `A${row + 1}` })
        XLSX.utils.sheet_add_aoa(ws, [['Sisa Uang']], { origin: `A${row + 3}` })
        XLSX.utils.sheet_add_aoa(ws, [[remaining]], { origin: `A${row + 4}` })
        row += 4
    }

    if (filename == "pengeluaran") {
        XLSX.utils.sheet_add_aoa(ws, [[remaining]], { origin: `A4` })

        pengeluaran.map(el => {
            XLSX.utils.sheet_add_aoa(ws, [[el._id]], { origin: `A${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.tanggal_keluar]], { origin: `B${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.jumlah_keluar]], { origin: `C${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.sumber]], { origin: `D${row}` })
            row++
        })
    }

    if (filename == "pemasukan_dan_pengeluaran") {
        XLSX.utils.sheet_add_aoa(ws, [['Data Pengeluaran']], { origin: `A${row + 2}` })
        row += 4

        // XLSX.utils.sheet_add_aoa(ws, [['ID Pengeluaran']], { origin: `B${row}` })
        // XLSX.utils.sheet_add_aoa(ws, [['Tgl Pengeluaran']], { origin: `C${row}` })
        // XLSX.utils.sheet_add_aoa(ws, [['Jumlah']], { origin: `D${row}` })
        // XLSX.utils.sheet_add_aoa(ws, [['ID Sumber']], { origin: `E${row}` })
        // row += 1

        XLSX.utils.sheet_add_aoa(ws, [['ID Pengeluaran']], { origin: `A${row}` })
        XLSX.utils.sheet_add_aoa(ws, [['Tgl Pengeluaran']], { origin: `B${row}` })
        XLSX.utils.sheet_add_aoa(ws, [['Jumlah']], { origin: `C${row}` })
        XLSX.utils.sheet_add_aoa(ws, [['ID Sumber']], { origin: `D${row}` })
        row += 1


        pengeluaran.map(el => {
            XLSX.utils.sheet_add_aoa(ws, [[el._id]], { origin: `A${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.tanggal_keluar]], { origin: `B${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.jumlah_keluar]], { origin: `C${row}` })
            XLSX.utils.sheet_add_aoa(ws, [[el.sumber]], { origin: `D${row}` })
        })
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

    const binaryString = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(binaryString)], { type: 'application/octet-stream' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

$(document).on('click', '#download-pemasukan', async function () {
    try {
        const pemasukanData = await fetchData(url_pemasukan);
        const pengeluaranData = await fetchData(url_pengeluaran);

        const pemasukan = pemasukanData.reduce((sum, item) => sum + (item.jumlah_masuk || 0), 0);
        const pengeluaran = pengeluaranData.reduce((sum, item) => sum + (item.jumlah_keluar || 0), 0);
        const remainingAmount = pemasukan - pengeluaran;

        const header = [
            { name: 'Data Pemasukan', origin: 'A1', style: { bold: true } },
            { name: 'ID Pemasukan', origin: 'A3', style: { bold: true } },
            { name: 'Tgl Pemasukan', origin: 'B3', style: { bold: true } },
            { name: 'Jumlah', origin: 'C3', style: { bold: true } },
            { name: 'ID Sumber', origin: 'D3', style: { bold: true } },
        ]

        handleDownloadExcel('pemasukan', pemasukanData, pengeluaranData, remainingAmount, header, 4)

    } catch (error) {
        console.error('Error export pemasukan!', error);
    }
})

$(document).on('click', '#download-pengeluaran', async function () {
    try {
        const pemasukanData = await fetchData(url_pemasukan);
        const pengeluaranData = await fetchData(url_pengeluaran);

        const pemasukan = pemasukanData.reduce((sum, item) => sum + (item.jumlah_masuk || 0), 0);
        const pengeluaran = pengeluaranData.reduce((sum, item) => sum + (item.jumlah_keluar || 0), 0);
        const remainingAmount = pemasukan - pengeluaran;

        const header = [
            { name: 'Sisa Uang', origin: 'A1' },
            { name: 'Sisa Uang', origin: 'A3' },
            { name: 'Data Pengeluaran', origin: 'A4' },
            { name: 'Tgl Pemasukan', origin: 'A7' },
            { name: 'ID Pengeluaran', origin: 'A9' },
            { name: 'Tgl Pengeluaran', origin: 'B9' },
            { name: 'Jumlah', origin: 'C9' },
            { name: 'ID Sumber', origin: 'D9' },
        ]

        handleDownloadExcel('pengeluaran', pemasukanData, pengeluaranData, remainingAmount, header, 10)

    } catch (error) {
        console.error('Error export pengeluaran!', error);
    }
})

$(document).on('click', '#download-pemasukan-pengeluaran', async function () {
    try {
        const pemasukanData = await fetchData(url_pemasukan);
        const pengeluaranData = await fetchData(url_pengeluaran);

        const pemasukan = pemasukanData.reduce((sum, item) => sum + (item.jumlah_masuk || 0), 0);
        const pengeluaran = pengeluaranData.reduce((sum, item) => sum + (item.jumlah_keluar || 0), 0);
        const remainingAmount = pemasukan - pengeluaran;

        const header = [
            { name: 'Data Pemasukan', origin: 'A1', style: { bold: true } },
            { name: 'ID Pemasukan', origin: 'A3', style: { bold: true } },
            { name: 'Tgl Pemasukan', origin: 'B3', style: { bold: true } },
            { name: 'Jumlah', origin: 'C3', style: { bold: true } },
            { name: 'ID Sumber', origin: 'D3', style: { bold: true } },
        ]

        handleDownloadExcel('pemasukan_dan_pengeluaran', pemasukanData, pengeluaranData, remainingAmount, header, 4)

    } catch (error) {
        console.error('Error export pemasukan dan pengeluaran!', error);
    }
})
