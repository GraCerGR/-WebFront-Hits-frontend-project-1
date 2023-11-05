
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
  .then(response => response.json())
  .then(data => {
    console.log(url);
    console.log(data);
    // Обновление списка селекта "Следующий элемент адреса"
    updateStreetSelect(data);
  })
  .catch(error => {
    console.error('Ошибка', error);
  });
}

// Функция для обновления списка селекта "Следующий элемент адреса"
function updateStreetSelect(data) {
  const streetSelect = document.getElementById('streetSelect');
  // Очистка селекта
  streetSelect.innerHTML = '';
  // Добавление полученных данных в селект
  if (data.length === 0) {
    const selectedOption = document.querySelector('.regionSelect option:checked');
    console.log(selectedOption.dataset.objectGuid);
  } else {
    data.forEach(street => {
      const option = document.createElement('option');
      option.value = street.objectId;
      option.text = street.text;
      const address = street.objectGuid;
      streetSelect.appendChild(option);
      console.log(street.objectGuid);
    });
  }
}

let parentObjectId = '';

document.querySelectorAll('.regionSelect').forEach(function(input) {
  input.addEventListener('input', function() {

  console.log('АААААААААААААААААА');
    query = this.value;
    if(!isNaN(query)){
      query = '';
    }
    console.log(query);
    const encodedQuery = encodeURIComponent(query);
    let url = `https://food-delivery.kreosoft.ru/api/address/search?query=${encodedQuery}`;
    if (parentObjectId) {
      url += `&parentObjectId=${parentObjectId}`;
    }
    console.log(url);
    console.log(query);
    //console.log(text.textContent);
    get(url);
  });
});

$("input").on('input', function () {
    var inputValue = this.value;
    if($('datalist').find('option').filter(function(){
        return this.value == inputValue;        
    }).length) {
    parentObjectId = this.value;
    const url = `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${parentObjectId}`;
    console.log('2');
    console.log(parentObjectId);
    console.log(url);
    get(url);
  }
});
/*
$(document).on('change', 'input', function(){
  console.log('Сдохни 1');
  var optionslist = $('datalist')[0].options;
  var value = $(this).val();
  for (var x=0;x<optionslist.length;x++){
     if (optionslist[x].value === value) {
      console.log('Сдохни 2');
      parentObjectId = this.value;
      const url = `https://food-delivery.kreosoft.ru/api/address/search?parentObjectId=${parentObjectId}`;
      console.log('2');
      console.log(parentObjectId);
      console.log(url);
      get(url);
        console.log(value);
        break;
     }
  }
});*/
/*
// Функция для обновления списка селекта "Следующий элемент адреса"
function updateStreetSelect(data) {
  const streetSelect = document.getElementById('streetSelect');
  // Очистка селекта
  streetSelect.innerHTML = '';
  // Добавление полученных данных в селект
  if (data.length === 0) {
    if (allData.length > 0) {
      allData.forEach(street => {
        console.log(street.objectGuid);
      });
    } else {
      console.log('Данные отсутствуют');
    }
  } else {
    data.forEach(street => {
      const option = document.createElement('option');
      option.value = street.objectId;
      option.text = street.text;
      option.setAttribute('data-object-guid', street.objectGuid);
      streetSelect.appendChild(option);
      //console.log(street.objectGuid);
    });
    // Добавляем текущие данные в массив allData
    allData = allData.concat(data);
  }
}*/