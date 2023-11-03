async function post(url, data=null){
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type' : 'application/json'
        })
    }).then(response => response.json());
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
          document.querySelector('.card-title').textContent = data.name;
          document.querySelector('[data-category]').textContent = `Категория блюда - ${data.category}`;
          document.querySelector('[data-vegetarian]').textContent = data.vegetarian ? 'Вегетарианское' : 'Не вегетарианское';
          document.querySelector('[data-description]').textContent = data.description;
          document.querySelector('[data-price]').textContent = `Цена: ${data.price} р/шт`;
          document.querySelector('.card-img-top').setAttribute('src', data.image);
      })
  .catch(error => {
      console.error('Ошибка', error);
  });
}
  
let queryString = window.location.search;
queryString = queryString.slice(1,-1);

  const url = `https://food-delivery.kreosoft.ru/api/dish/{${queryString}}`;
  get(url);
  
  //