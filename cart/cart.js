let token = localStorage.getItem('token');
console.log(token);

async function post(url, data=null, token){
  return fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
          'Content-Type' : 'application/json',
          "Authorization": `Bearer ${token}`
      })
  }).then(response => response.json());
}

function createCard(data) {
  const cardContainerWrapper = document.querySelector('.list-group.list-group-flush');
  const cardContainer = document.createElement('ul');
  cardContainer.classList.add('list-group');
  const queryString = new URLSearchParams(data.id).toString();
  const url = `/dish/dish.html?${queryString}`;
  cardContainer.innerHTML = `
  <ul class="list-group">
  <li class="card h-100 item w-100" style="width: 19rem; data-id="${data.id}">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <img src="${data.image}" class="card-img-top" width="100">
          </div>
          <div class="col-md-8">
            <div class="d-flex flex-column justify-content-between h-100">
              <div>
                <h5 data-name="${data.name}">${data.name}</h5>
                <p class="card-text" data-description="${data.amount}">Количество: ${data.amount}</p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" data-price="Цена">Цена/шт: ${data.price} руб.</li>
                <li class="list-group-item" data-price="Общая цена">Общая цена: ${data.totalPrice} руб.</li>
              </ul>
            </div>
          </div>
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

  get(`https://food-delivery.kreosoft.ru/api/basket`,token);