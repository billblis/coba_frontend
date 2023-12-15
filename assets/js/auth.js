import { getCookie } from "https://jscroot.github.io/cookie/croot.js";

function checkTokenAndRedirect() {
    const tokens = "Authorization";
    const tokenValue = getCookie(tokens);
    console.log("Token Value:", tokenValue);

    if (!tokenValue) {
        console.log("Token not found, redirecting to login.");
        window.location.href = "./login.html";
    }
}

window.onload = checkTokenAndRedirect;