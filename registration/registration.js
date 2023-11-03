/*function updateSelectElements(data) {
  const regionSelect = document.getElementById('regionSelect');
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
      option.addEventListener('click', function() {
        const parentObjectId = this.value;
        const newUrl = `${url}?parentObjectId=${parentObjectId}`;
        get(newUrl, token);
      });
    }
    
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
      if (regionSelect.value) {
        const parentObjectId = regionSelect.value;
        const query = citySelect.value;
        const newUrl = `${url}?parentObjectId=${parentObjectId}&query=${encodeURIComponent(query)}`;
        get(newUrl, token);
      } else {
          updateSelectElements(data);
        }
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
      console.log(data)
    })
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
});*/


async function get(url, token, nextElementLabel) {
    return fetch(url, {
        method: 'GET',
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Генерация следующего элемента
        generateNextElement(nextElementLabel, data);
    })
    .catch(error => {
        console.error('Ошибка', error);
    });
}

// Функция для генерации следующего элемента
function generateNextElement(nextElementLabel, data) {
    const container = document.querySelector('.container3');
    const newElement = document.createElement('div');
    newElement.className = 'col-12 p-2';

    const label = document.createElement('label');
    label.htmlFor = 'Subject';
    label.className = 'form-label';
    label.textContent = nextElementLabel;

    const input = document.createElement('input');
    input.className = 'regionSelect form-control';
    input.setAttribute('list', 'streetSelect');

    const datalist = document.createElement('datalist');
    datalist.id = 'streetSelect';

    // Добавление полученных данных в список
    data.forEach(street => {
        const option = document.createElement('option');
        option.value = street.objectId;
        option.textContent = street.text;
        datalist.appendChild(option);
    });

    newElement.appendChild(label);
    newElement.appendChild(input);
    newElement.appendChild(datalist);

    container.appendChild(newElement);
}

// Обработчик события выбора селекта "Субъект РФ"
document.querySelectorAll('.regionSelect.form-control').forEach(function(input) {
    input.addEventListener('input', function() {
        const parentObjectId = this.value;
        const url = `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${parentObjectId}`;
        const nextElementLabel = 'Следующий элемент';
        console.log(url);
        console.log(parentObjectId);
        get(url, 0, nextElementLabel);
    });
});
