import { addInner } from "https://jscroot.github.io/element/croot.js";
import { navbarUser } from "./table.js";
import { getWithToken } from "./component.js";

const target_url = "https://asia-southeast2-xenon-hawk-402203.cloudfunctions.net/BillblisUser";

const dataUser  = (value) => {
    const data = navbarUser
    .replace("#USERNAME#", value.username)

    addInner("usernameNav", data);
}

const responseData = (result) => {
    if (result.status === true) {
        result.data.forEach(dataUser);
    }
}

getWithToken(target_url, responseData);