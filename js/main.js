async function post(url, data=null){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    }).then(response => response.json());
}


async function get(url,token){
    return fetch(url,{
        method: 'GET',
        headers: new Headers({
            "Autorization": `Bearer ${token}`
        }),
    }).then(response => response.json()).then(data => {console.log(data)})
    .catch(error => {console.error('Ошибка', error)});
}

url = "https://food-delivery.kreosoft.ru/api/dish";
get(url);
