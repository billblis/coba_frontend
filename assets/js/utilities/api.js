export const post = (target_url, datajson, responseFunction) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(datajson);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            return responseFunction(JSON.parse(result))
        })
        .catch(error => console.log('error', error));
}

export const postWithToken = (target_url, tokenkey, tokenvalue, datajson, responseFunction) =>{
    const myHeaders = new Headers();
    myHeaders.append(tokenkey, tokenvalue);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(datajson);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

export const postWithBearer = (target_url, token, datajson, responseFunction) =>{
    const myHeaders = new Headers();
    myHeaders.append("token", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(datajson);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}

export const get = (target_url, responseFunction) =>{
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => response.text())
        .then(result => responseFunction(JSON.parse(result)))
        .catch(error => console.log('error', error));
}