import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

const deleteUser = async (USERHAPUS) => {
  const username = USERHAPUS;
  const token = getCookie("Authorization");

  const isConfirmed = await Swal.fire({
    title: "Benarkah anda ingin menghapus akun ini?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Benar",
    cancelButtonText: "Tidak",
  });

  if (isConfirmed.isConfirmed) {
    // console.log("Confirmed:", isConfirmed.isConfirmed);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);

    const target_url =
      "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/BillblisUser?username=" + username;

    try {
      const response = await fetch(target_url, {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      });

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Akun berhasil dihapus",
          text: result.message,
        }).then(() => {
            deleteCookie("Authorization");
            window.location.href = "../login.html";
        });

      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

window.deleteUser = deleteUser;