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
  const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('col');
  const queryString = new URLSearchParams(data.id).toString();
  const url = `/dish/dish.html?${queryString}`;
  cardContainer.innerHTML = `
      <div class="card h-100 item" style="width: 19rem; data-id="${data.id}">
          <a href="${url}" class="item">
              <img src="${data.image}" class="card-img-top">
              <div class="card-body">
                  <h5 data-name="${data.name}">${data.name}</h5>
              </a>
              <p class="card-text" data-description="${data.amount}"> Количество: ${data.amount}</p>
          </div>
          <ul class="list-group list-group-flush">
                  <li class="list-group-item" data-price="Цена">Цена/шт: ${data.price} руб.</li>
                  <li class="list-group-item" data-price="Общая цена">Общая цена: ${data.totalPrice} руб.</li>
         </ul>
          </div>
      </div>
  `;
  cardContainerWrapper.appendChild(cardContainer);
}

function getRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const emptyStars = 10 - fullStars;
  const decimalPart = rating % 1;
  let starsHTML = '';
  for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="active"></span>';
  }
  for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span></span>';
  }

  return starsHTML;
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