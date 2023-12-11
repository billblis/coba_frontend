import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { getValue } from "https://jscroot.github.io/element/croot.js"

const insertPemasukan = () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/insertPemasukan"
    const tokenkey = "Authorization";
    const tokenvalue = getCookie("Authorization");

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