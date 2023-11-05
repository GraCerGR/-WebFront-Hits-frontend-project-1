let token = localStorage.getItem('token');
console.log(token);
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
    document.getElementById('inputName').value = data.fullName;
    document.getElementById('inputEmail').value = data.email;
    document.getElementById('inputData').value = data.birthDate;
    document.getElementById('inputMale').value = data.gender;
    document.getElementById('inputNumber').value = data.phoneNumber;
    document.getElementById('inputAddressId').value = data.address;

  })
  .catch(error => {
    console.error('Ошибка', error);
  });
}
const url = `https://food-delivery.kreosoft.ru/api/account/profile`;
get(url, token)

