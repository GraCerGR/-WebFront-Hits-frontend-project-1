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

/*  function sortCards(sortType, data) {
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
  }*/


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

      //sortCards(sortType, data);

      data.dishes.forEach(dish => {
        createCard(dish);
      });
      maxPagination = data.pagination.count;
      updatePagination(maxPagination);
      {console.log(maxPagination)}
      {console.log(data)}
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
  }
  
  let maxPagination;
  let pageNumber = 1; // Инициализируем переменную pageNumber

  const url = `https://food-delivery.kreosoft.ru/api/dish?page=1`;
  get(url);
  updatePageNumberInURL(pageNumber);


  function applyFilters() {
    const categorySelect = document.querySelector('.form-select');
    const sortSelect = document.getElementById('sortSelect');
    const vegetarianCheckbox = document.getElementById('flexSwitchCheckDefault');
  
    const category = categorySelect.value;
    const sortType = sortSelect.value;
    const vegetarianOnly = vegetarianCheckbox.checked;
  
    let url = `https://food-delivery.kreosoft.ru/api/dish?`;

  // Добавляем параметры фильтрации и сортировки в URL
  if (category !== "All") {
    url += `categories=${category}&`;
  }
  url += `vegetarian=${vegetarianOnly}&sorting=${sortType}&page=1`;

  const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
  cardContainerWrapper.innerHTML = '';
  get(url);
  updatePageNumberInURL(1);
}
  
  const applyButton = document.querySelector('.btn-primary');
  applyButton.addEventListener('click', applyFilters);

  const pagination = document.getElementById('pagination');
  pagination.addEventListener('click', (event) => {
    event.preventDefault();
    const link = event.target;
    
    if (link.innerText === '«') {
      const currentPage = document.querySelector('.page-item.active .page-link');
      //console.log(currentPage);
      pageNumber = pageNumber - 1; // Получаем предыдущий номер страницы
      //console.log(pageNumber);
    } else if (link.innerText === '»') {
      const currentPage = document.querySelector('.page-item.active .page-link');
      pageNumber = pageNumber + 1; // Получаем следующий номер страницы
      //console.log(pageNumber);
    } else {
      pageNumber = parseInt(link.innerText); // Получаем номер страницы из текста ссылки
      console.log(pageNumber);
    }
    if (pageNumber >= 1 && pageNumber <=maxPagination)  {
      const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
      cardContainerWrapper.innerHTML = '';
      const url = `https://food-delivery.kreosoft.ru/api/dish?page=${pageNumber}`;
      get(url);
      updatePageNumberInURL(pageNumber);
    } else if (pageNumber <= 1){
      pageNumber = 1;
    } else if (pageNumber >= maxPagination){
      pageNumber = maxPagination;
    }
  });



 /* const sortSelect = document.getElementById('sortSelect');
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
});*/

// Генерация элементов списка страниц
function updatePagination(maxPagination) {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }

for (let i = 1; i <= maxPagination; i++) {
  console.log(maxPagination);
  const li = document.createElement('li');
  li.classList.add('page-item');
  const a = document.createElement('a');
  a.classList.add('page-link');
  a.href = '#';
  a.innerText = i;
  li.appendChild(a);
  pagination.appendChild(li);
}
const firstPageLink = document.createElement('a');
firstPageLink.classList.add('page-link');
firstPageLink.href = '#';
firstPageLink.innerHTML = '&laquo;'; // Символ «
const lastPageLink = document.createElement('a');
lastPageLink.classList.add('page-link');
lastPageLink.href = '#';
lastPageLink.innerHTML = '&raquo;'; // Символ »

const firstPageItem = document.createElement('li');
firstPageItem.classList.add('page-item');
firstPageItem.appendChild(firstPageLink);

const lastPageItem = document.createElement('li');
lastPageItem.classList.add('page-item');
lastPageItem.appendChild(lastPageLink);

pagination.insertBefore(firstPageItem, pagination.firstChild);
pagination.appendChild(lastPageItem);
}