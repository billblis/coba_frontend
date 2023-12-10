import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js"

const insertPemasukan = () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPemasukan"
    const tokenkey = "token";
    const tokenvalue = getCookie("token");

    const data = {
        "tanggal_masuk": getValue("tanggal_masuk"),
        "jumlah_masuk": parseInt(getValue("jumlah_masuk")),
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
            window.location.href = "pemasukan.html";
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

btnInsert.addEventListener("click", insertPemasukan);


// const PostinsertPemasukan = () => {
//     const radioButtons = document.querySelectorAll('input[name="radioOption"]');
//     let selectedValue;

//     radioButtons.forEach(radioButton => {
//         if (radioButton.checked) {
//             selectedValue = radioButton.value;
//         }
//     });

//     //validasi form
//     if (getValue("tanggal_masuk_input") === ""|| getValue("tanggal_masuk_input") === null) {
//         alert("Tanggal tidak boleh kosong");
//         return;
//     }else if (getValue("rupiahInput") === ""|| getValue("rupiahInput") === null) {
//         alert("Jumlah masuk tidak boleh kosong");
//         return;
//     }else if (getValue("sumber_input") === ""|| getValue("sumber_input") === null) {
//         alert("Sumber tidak boleh kosong");
//         return;
//     }else if (getValue("deskripsi_input") === ""|| getValue("deskripsi_input") === null) {
//         alert("Deskripsi tidak boleh kosong");
//         return;
//     } else if (selectedValue === "" || selectedValue === null) {
//         alert("Deskripsi tidak boleh kosong");
//         return;
//     }

//     const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPemasukan";
//     const datainjson = {
//         tanggal_masuk: getValue("tanggal_masuk_input"),
//         source: {
//             source: selectedValue,
//             value: getValue("tanggal_masuk_input")
//         }
//     };
//     const token = getCookie("token")
//     if (token) {
//         postWithBearer(target_url, token, datainjson, responseData)
//         alert("Berhasil menambahkan topik")
//     } else {
//         console.log("token tidak ada " + result.message);
//         alert("sesi anda sudah habis, silahkan logout dan login ulang")
//     }
// };

// const responseData = (result) => {
//     // console.log(result);
//     if (result.status === true) {
//         window.location.href = "pemasukan.html";
//     } else {
//         console.log(result.message);
//         alert(`sesi anda sudah habis, silahkan logout dan login ulang`);
//     }
// };

// Function to insert income data
// function insertPemasukan(tanggal_masuk, jumlah_masuk, sumber, deskripsi) {
//     try {
//         const response = fetch('https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPemasukan', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 tanggal_masuk: tanggal_masuk,
//                 jumlah_masuk: jumlah_masuk,
//                 sumber: sumber,
//                 deskripsi: deskripsi,
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to insert income data');
//         }

//         const result = response.json();
//         console.log('Inserted ID:', result.insertedID);
//         return result.insertedID;
//     } catch (error) {
//         console.error('Error inserting income data:', error);
//         return null;
//     }
// }

//   function tambahData() {
//   // Mendapatkan nilai dari input elemen (tanggal, jumlah, sumber, deskripsi)
//   const tanggalInput = document.getElementById("tanggalInput");
//   const rupiahInput = document.getElementById("rupiahInput");
//   const selectSumber = document.getElementById("selectSumber"); // Ganti "sumber" dengan ID yang benar
//   const deskripsiInput = document.getElementById("deskripsiInput"); // Ganti "textarea" dengan ID yang benar

//    // Periksa apakah elemen ditemukan sebelum mencoba membaca properti 'value'
//    if (!tanggalInput || !rupiahInput || !selectSumber || !deskripsiInput) {
//    console.error("Salah satu elemen tidak ditemukan.");
//    return;
//   }

//   const tanggal = tanggalInput.value;
//   const jumlah = rupiahInput.value;
//   const sumber = selectSumber.value;
//   const deskripsi = deskripsiInput.value;
// >>>>>>> 143d57c5533c665f12b1354bc1399998bf307e94

//   // Lakukan validasi (tambahkan validasi sesuai kebutuhan)

// <<<<<<< HEAD
// // export default PostinsertPemasukan;
// =======
//   // Lakukan sesuatu dengan data yang telah diperoleh
//   console.log("Tambah Data Pemasukan:");
//   console.log("Tanggal:", tanggal);
//   console.log("Jumlah:", jumlah);
//   console.log("Sumber:", sumber);
//   console.log("Deskripsi:", deskripsi);

//   // Reset nilai input setelah data ditambahkan (sesuaikan dengan kebutuhan)
//    tanggalInput.value = "";
//    rupiahInput.value = "";
//    selectSumber.value = "Pilih Sumber";
//    deskripsiInput.value = "";
//   }

//   function batalTambahData() {
//   // Reset nilai input jika batal (sesuaikan dengan kebutuhan)
//   document.getElementById("tanggalInput").value = "";
//   document.getElementById("rupiahInput").value = "";
//   document.getElementById("selectSumber").value = "Pilih Sumber";
//   document.getElementById("deskripsiInput").value = "";
//   }  

// // Example usage
// // document.getElementById("submitIncomeButton").addEventListener("click", insertPemasukan);
// document.getElementById("submitEventButton").addEventListener("click",  function () {
//     const tanggal_masuk = eventDateInput.value; // Assuming eventDateInput is defined
//     const jumlah_masuk = parseInt(document.getElementById("jumlahMasuk").value); // Assuming jumlahMasuk is the ID for the input field
//     const sumber = document.getElementById("sumber").value; // Assuming sumber is the ID for the input field
//     const deskripsi = document.getElementById("deskripsi").value; // Assuming deskripsi is the ID for the input field

//     const insertedID =  insertPemasukan(tanggal_masuk, jumlah_masuk, sumber, deskripsi);

//     if (insertedID !== null) {
//         // Do something with the inserted ID if needed
//         console.log("Inserted ID:", insertedID);
//     }
// });
// >>>>>>> 143d57c5533c665f12b1354bc1399998bf307e94
