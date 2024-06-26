let token;

async function post(url, data = null) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        // Если успех, получаем токен из ответа
        token = data.token;
        // Далее можно выполнять другие действия с полученным токеном
        // Например, сохранить его в localStorage и перенаправить пользователя на другую страницу
      } else {
        // Если ошибка, выводим сообщение об ошибке
        alert(data.message || 'Неверный логин или пароль');
      }
      localStorage.setItem('token', token);
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
}
  const url = "https://food-delivery.kreosoft.ru/api/account/login";
const loginButton = document.getElementById('loginButton');
if (loginButton){
loginButton.addEventListener('click', function() {
  const email = document.getElementById('Email').value;
  const password = document.getElementById('password').value;
  
  const data = {
    email: email,
    password: password
  };
console.log(data);
post(url, data);
console.log(token);
});}

export { token };