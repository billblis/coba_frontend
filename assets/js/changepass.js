import { getValue } from "https://jscroot.github.io/element/croot.js";
import { putWithToken } from "./component.js";

const updateUser = () => {
    const username = getValue("username1");

    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/BillblisUser?username=" + username;

    const data = {
        password : getValue("newpass"),
        confirmpassword : getValue("confirmpass"),
    };

    const change = document.getElementById('change');
    change.classList.add('is-loading');
    
    putWithToken(target_url, data, responseData);
};

const responseData = (result) => {
    const change = document.getElementById('change');
    change.classList.remove('is-loading');

    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Update Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "../login.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Update Failed",
            text: result.message,
        });
    }
}

const change = document.getElementById("change");

// change.addEventListener("click", updateUser);

change.addEventListener("click", () => {
    console.log("button aktif");
    updateUser();
  });