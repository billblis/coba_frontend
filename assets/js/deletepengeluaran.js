import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const deletePengeluaran= async (IDHAPUS) => {
    const pengeluaranID = IDHAPUS;
    const token = getCookie("token");
  
    const isConfirmed = await Swal.fire({
      title: "Benarkah anda ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Benar",
      cancelButtonText: "Tidak",
    });

    if (isConfirmed.isConfirmed) {
        const myHeaders = new Headers();
        myHeaders.append("token", token);
    
        const target_url =
          "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/deletePemasukan?_id=" + pengeluaranID;
    
        try {
          const response = await fetch(target_url, {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
          });
    
          if (response.ok) {
            await Swal.fire({
              icon: "success",
              title: "Data berhasil dihapus",
              showConfirmButton: false,
              timer: 1500,
            });
            location.reload();
          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    
    window.deletePengeluaran = deletePengeluaran;