// loading-modal.js

// Fungsi untuk menampilkan modal loading
export function showLoadingModal() {
    console.log("loading");
    document.getElementById('loadingModal').style.display = 'block';
}

// Fungsi untuk menyembunyikan modal loading
export function hideLoadingModal() {
    console.log("tidak loading");
    document.getElementById('loadingModal').style.display = 'none';
}
