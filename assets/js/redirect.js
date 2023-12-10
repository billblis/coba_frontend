import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

const checkTokenAndRedirect = () => {
    const token = "Authorization";
    const tokenValue = getCookie(token);

    if (!tokenValue) {
        window.location.href = "../login.html";
    }
}

window.onload = checkTokenAndRedirect;