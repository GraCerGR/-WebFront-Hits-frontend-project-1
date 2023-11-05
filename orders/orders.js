let token = localStorage.getItem('token');
console.log(token);

async function Delete(url, data=null, token){
  return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: new Headers({
          'Content-Type' : 'application/json',
          "Authorization": `Bearer ${token}`
      })
  });
}

function createCard(data) {
  const cardContainerWrapper = document.querySelector('.list-group.list-group-flush');
  const cardContainer = document.createElement('ul');
  cardContainer.classList.add('list-group');
  const queryString = new URLSearchParams(data.id).toString();
  const url = `/dish/dish.html?${queryString}`;

  // Функция для форматирования даты в читабельный вид
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', options);
  }

  function formatStatus(status) {
    if (status === 'Delivered') {
      return 'Доставлен';
    } else if (status === 'In Process'){
      return 'В процессе';
    }
    return status;
  }

  cardContainer.innerHTML = `
    <ul class="list-group">
      <li class="card h-100 item w-100" style="width: 19rem; data-id="${data.id}">
        <div class="card-body">
          <h5 data-name="${data.orderTime}">Заказ от ${formatDate(data.orderTime)}</h5>
          <h5 data-name="${data.status}">Статус: ${formatStatus(data.status)}</h5>
          <h5 data-name="${data.deliveryTime}">Доставлен: ${formatDate(data.deliveryTime)}</h5>
          <div style="position: absolute; bottom: 10px; right: 10px;">
            <h5 data-name="${data.price}">Стоимость заказа: ${data.price} руб.</h5>
          </div>
        </div>
      </li>
    </ul>
  `;
  cardContainerWrapper.appendChild(cardContainer);
}


  async function get(url, token) {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    })
    .then(response => response.json())//.then(data => {console.log(data
      //)})
    .then(data => {
      if (data.length === 0) {
        const emptyCartMessage = document.getElementById('empty-cart-message');
        emptyCartMessage.style.display = 'block';
        return;
      }


      data.forEach(dish => {
        createCard(dish);
      });
      //{console.log(maxPagination)}
      {console.log(data)}
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
  }

  get(`https://food-delivery.kreosoft.ru/api/order`,token);