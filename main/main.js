let token = localStorage.getItem('token');
console.log(token);



async function post(url, data = null, token) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    })
  });

  if (response.status === 401) {
    // Выводите уведомление "Войдите в аккаунт" здесь
    alert("Войдите в аккаунт");
  }

  return response;
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
                  <h6 class=" mb-2 text-body-secondary" data-category="${data.category}">Категория блюда - ${data.category}</h6>
              </a>
              <div class="rating-result container3">
                  ${getRatingStars(data.rating)}
              </div>
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
      </div>
  `;
  cardContainerWrapper.appendChild(cardContainer);

  const addToCartButton = cardContainer.querySelector('.btn-primary');
  addToCartButton.addEventListener('click', () => {
    addToCart(data.id);
  });
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
  
  function updatePageNumberInURL(pageNumber, category, sortType, vegetarianOnly) {
    const url = new URL(window.location.href);
    url.searchParams.set('categories', category);
    url.searchParams.set('sorting', sortType);
    url.searchParams.set('vegetarian', vegetarianOnly);
    url.searchParams.set('page', pageNumber);
    window.history.pushState({}, '', url);
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

      data.dishes.forEach(dish => {
        createCard(dish);
      });
      maxPagination = data.pagination.count;
      updatePagination(maxPagination);
      //{console.log(maxPagination)}
      {console.log(data)}
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
  }
  
  let maxPagination;
  let url;
  let pageNumber = 1;
  get(`https://food-delivery.kreosoft.ru/api/dish`);


  function applyFilters(link) {
    const categorySelect = document.querySelector('.form-select');
    const sortSelect = document.getElementById('sortSelect');
    const vegetarianCheckbox = document.getElementById('flexSwitchCheckDefault');
  
    const category = categorySelect.value;
    const sortType = sortSelect.value;
    const vegetarianOnly = vegetarianCheckbox.checked;
  
    url = `https://food-delivery.kreosoft.ru/api/dish?`;

    if (isNaN(pageNumber)) {
      pageNumber = 1;
  }

  // Добавляем параметры фильтрации и сортировки в URL
  if (category !== "All") {
    url += `categories=${category}&`;
  }
  url += `vegetarian=${vegetarianOnly}&sorting=${sortType}&`;


  if (link.innerText === '«') {
    //console.log(currentPage);
    pageNumber = pageNumber - 1; // Получаем предыдущий номер страницы
    //console.log(pageNumber);
  } else if (link.innerText === '»') {
    pageNumber = pageNumber + 1; // Получаем следующий номер страницы
    //console.log(pageNumber);
  } else {
    pageNumber = parseInt(link.innerText); // Получаем номер страницы из текста ссылки
    //console.log(pageNumber);
  }
   if (pageNumber <= 1){
    pageNumber = 1;
  } else if (pageNumber >= maxPagination){
    pageNumber = maxPagination;
  } 
  if(pageNumber >= 1 && pageNumber <=maxPagination)  {
    const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
    cardContainerWrapper.innerHTML = '';
    url += `page=${pageNumber}`;
    //console.log(url);
  }

  const cardContainerWrapper = document.querySelector('.row-cols-1.row-cols-md-4.g-4');
  cardContainerWrapper.innerHTML = '';

  if (isNaN(pageNumber)) {
    pageNumber = 1;
}

  console.log(url);
  get(url);
  updatePageNumberInURL(pageNumber, category, sortType, vegetarianOnly);
}
  
  const applyButton = document.querySelector('.btn-primary');
  applyButton.addEventListener('click', applyFilters);

  pagination.addEventListener('click', (event) => {
    event.preventDefault();
    const link = event.target;
    if (!link.classList.contains('page-link')) {
      return; // Выходим из функции, если целевой элемент не является ссылкой
    }
    applyFilters(link); 
  });



// Генерация элементов списка страниц
function updatePagination(maxPagination) {
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }

for (let i = 1; i <= maxPagination; i++) {
  //console.log(maxPagination);
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


async function addToCart(itemId) {
  const url = `https://food-delivery.kreosoft.ru/api/basket/dish/${itemId}`;
  const response = await post(url, {}, token);
  console.log(response);
}