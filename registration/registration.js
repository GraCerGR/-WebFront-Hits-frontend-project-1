function updateSelectElements(data) {
  const regionSelect = document.querySelector('#regionSelect');
  const citySelect = document.querySelector('#citySelect');
  const streetSelect = document.querySelector('#streetSelect');
  const buildingSelect = document.querySelector('#buildingSelect');
  // Очистка текущих значений в select контейнерах
  regionSelect.innerHTML = '';
  citySelect.innerHTML = '';
  streetSelect.innerHTML = '';
  buildingSelect.innerHTML = '';
  console.log(data);
  // Создание и добавление новых option элементов
  data.forEach(item => {
    console.log(item);
    if (item.objectLevel === 'Region') {
      const option = document.createElement('option');
      option.value = item.objectId;
      option.textContent = item.text;
      regionSelect.appendChild(option);
    }/* else if (item.objectLevel === 'City') {
      const option = document.createElement('option');
      option.value = item.objectId;
      option.textContent = item.text;
      citySelect.appendChild(option);}
     else if (item.objectLevel === 'Street') {
      const option = document.createElement('option');
      option.value = item.objectId;
      option.textContent = item.text;
      streetSelect.appendChild(option);
    } else if (item.objectLevel === 'Building') {
      const option = document.createElement('option');
      option.value = item.objectId;
      option.textContent = item.text;
      buildingSelect.appendChild(option);
    }*/
  });
}



async function post(url, data=null){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    }).then(response => response.json())
    .then(data => {
      updateSelectElements(data);
    }).then(data => {console.log(data)});
}
  
  async function get(url, token) {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    })
    .then(response => response.json()).then(data => {
      updateSelectElements(data);
    })
    .then(data => {console.log(data
      )})
    .catch(error => {
      console.error('Ошибка', error);
    });
  }
  
  const url = "https://food-delivery.kreosoft.ru/api/address/search";
  get(url);


const loginButton = document.getElementById('registrationButton');
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