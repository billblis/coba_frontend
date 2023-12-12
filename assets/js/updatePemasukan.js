import { getValue } from "https://jscroot.github.io/element/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const putData = (target_url, data, responseFunction) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", getCookie("Authorization"));

    const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const responseData = (result) => {
    console.log("Server Response:", result, result.status);
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Update Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "pemasukan.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: result.message,
        });
    }
}

const updatePemasukan = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const _id = urlParams.get("_id");

    console.log("pemasukanID:", _id);

    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/updatePemasukan?_id=" + _id;

    const data = {
        "tanggal_masuk": getValue("tanggal_masuk"),
        "jumlah_masuk": parseInt(getValue("jumlah_masuk")),
        "sumber": getValue("sumber"),
        "deskripsi" : getValue("deskripsi"),
    };
    
    putData(target_url, data, responseData);

    console.log("Data:", data);
};

const btnUpdates = document.getElementById("btnUpdate");

btnUpdates.addEventListener("click", () => {
    console.log("button aktif");
    updatePemasukan();
  });