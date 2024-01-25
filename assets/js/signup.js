import { getValue } from "https://jscroot.github.io/element/croot.js";

function postRegister(target_url, data, responseFunction) {

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

const Register = () => {
    const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/signup";
    
    const data = {
        "email" : getValue("email"),
        "username": getValue("username"),
        "phonenumber": getValue("phonenumber"),
        "password": getValue("password"),
    };
    
    postRegister(target_url, data, responseData);
}

function responseData (result) {
    if (result.status === true) {
        Swal.fire({
            icon: "success",
            title: "Register Successful",
            text: result.message,
        }).then(() => {
            window.location.href = "../login.html";
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Register Failed",
            text: result.message,
        });
    }
}

document.getElementById("button1").addEventListener("click", Register);