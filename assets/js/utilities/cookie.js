// cookieUtil.js
// const isCookieExist = (cookieName) {
//     const cookies = document.cookie.split('; ');
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i];
//         const cookieParts = cookie.split('=');
//         if (cookieParts[0] === cookieName) {
//             return true;
//         }
//     }
//     return false;
// }
export const deleteCookie = (name) => {
    console.log("delete cookie")
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
export const setCookieWithExpireDay = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const setCookieWithExpireHour = (cname, cvalue, exhour) => {
    const d = new Date();
    d.setTime(d.getTime() + (exhour * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const setCookieWithExpireSecond = (cname, cvalue, exsecs) => {
    const d = new Date();
    d.setTime(d.getTime() + (exsecs * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}