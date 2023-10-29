async function post(url, data=null){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
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
      <div class="card h-100 item" style="width: 19rem; data-id="${data.id}"">
      <a href="${url}" class="item">
        <img src="${data.image}" class="card-img-top">
        <div class="card-body">
          <h5 data-name="${data.name}">${data.name}</h5>
          <h6 class=" mb-2 text-body-secondary" data-category="${data.category}">Категория блюда - ${data.category}</h6>
          </a>
          <input type="range" class="custom-range" min="0" max="10" step="0.1">
          <p class="card-text" data-description="${data.description}">${data.description}</p>
        </div>
        <div class="card-footer text-body-secondary">
          <div class="row align-items-start">
            <div class="col" data-price="Цена">Цена - ${data.price}р</div>
            <div class="col">
              <button type="button" class="btn btn-primary">В корзину</button>
            </div>
          </div>
        </div>
    `;
    cardContainerWrapper.appendChild(cardContainer);
  }
  
  function updatePageNumberInURL(pageNumber) {
    const url = new URL(window.location.href);
    url.searchParams.set('page', pageNumber);
    window.history.pushState({}, '', url);
  }

  function sortCards(sortType, data) {
    if(sortType === 'price'){
      data.dishes.sort((a, b) => a.price - b.price);
    }
    if(sortType === '-price'){
      data.dishes.sort((a, b) => b.price - a.price);
    }
    if(sortType ==='rating'){
      data.dishes.sort((a, b) => a.rating - b.rating);
    }
    if(sortType === '-rating'){
      data.dishes.sort((a, b) => b.rating - a.rating);
    }
    if(sortType === 'name'){
      data.dishes.sort((a, b) => a.name.localeCompare(b.name));
    }
    if(sortType === '-name'){
      data.dishes.sort((b, a) => a.name.localeCompare(b.name));
    }
  }


  async function get(url, token, sortType) {
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    })
    .then(response => response.json())//.then(data => {console.log(data
      //)})
    .then(data => {

      sortCards(sortType, data);

      data.dishes.forEach(dish => {
        createCard(dish);
      });
      {console.log(data)}
      updatePageNumberInURL(pagination
        );
      
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
  }
  
  const url = "https://food-delivery.kreosoft.ru/api/dish";

  const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', (event) => {
  const sortType = event.target.value;
  const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
  cardContainerWrapper.innerHTML = '';
  get(url, 0, sortType);
});

document.addEventListener('DOMContentLoaded', () => {
  // Ваш код функции, которую нужно выполнить один раз при загрузке страницы
  const url = "https://food-delivery.kreosoft.ru/api/dish";
  get(url);
});