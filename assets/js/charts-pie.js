
export const setPieChart = (pemasukan, pengeluaran) => {
  const pieConfig = {
    type: 'doughnut',
    data: {
      datasets: [
        {
          data: [pemasukan, pengeluaran],
          backgroundColor: ['#1c64f2', ' #dc3545'],
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
  }

  const pieCtx = document.getElementById('pie')
  window.myPie = new Chart(pieCtx, pieConfig)
}

