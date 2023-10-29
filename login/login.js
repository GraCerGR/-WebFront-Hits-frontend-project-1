async function post(url, data=null){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    }).then(response => response.json()).then(data => {console.log(data)});
}
  
  async function get(url, token) {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    })
    .then(response => response.json())
    .then(data => {
      data.dishes.forEach(dish => {
      });
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
  }
  
  const url = "https://food-delivery.kreosoft.ru/api/account/login";
  post(url);


const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', function() {
  const email = document.getElementById('Email').value;
  const password = document.getElementById('password').value;
  
  const data = {
    email: email,
    password: password
  };
console.log(data);
post(url, data);
});