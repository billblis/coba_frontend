
function aggregateEntityByMonth(entities, type) {
  const orderedMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const groupedEntity = {};

  entities.forEach(entity => {
    const amount = type == 'pemasukan' ? entity.jumlah_masuk : entity.jumlah_keluar
    const date = type == 'pemasukan' ? entity.tanggal_masuk : entity.tanggal_keluar
    const month = date.split('-')[1];
    const key = month;

    if (!groupedEntity[key]) {
      groupedEntity[key] = { total: 0 };
    }

    groupedEntity[key].total += amount;
  });

  const result = orderedMonths.map(month => ({ month, ...groupedEntity[month] }));
  return result;
}

export const setBarChart = (pemasukan, pengeluaran) => {
  const res_pemasukan = aggregateEntityByMonth(pemasukan, 'pemasukan');
  const res_pengeluaran = aggregateEntityByMonth(pengeluaran, 'pengeluaran');

  const grouped_pemasukan = res_pemasukan.map(el => el.total ? el.total : 0)
  const grouped_pengeluaran = res_pengeluaran.map(el => el.total ? el.total : 0)

  console.log(grouped_pemasukan)
  console.log(grouped_pengeluaran)

  const barConfig = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      datasets: [
        {
          label: 'Pemasukan',
          backgroundColor: '#0694a2',
          borderWidth: 1,
          data: grouped_pemasukan,
        },
        {
          label: 'Pengeluaran',
          backgroundColor: '#7e3af2',
          borderWidth: 1,
          data: grouped_pengeluaran,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
    },
  }

  const barsCtx = document.getElementById('bars')
  window.myBar = new Chart(barsCtx, barConfig)
}


