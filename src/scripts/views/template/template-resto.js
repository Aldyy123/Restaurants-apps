import config from '../../globals/Config'

const listResto = (restaurant) => `
<a href="#/detail/${restaurant.id}" class="link-resto lazyload">   
        <div class="card" id="${restaurant.id}">
              <div class="header-resto">
                <h4 class="overlay">${restaurant.city}</h4>
<picture>
<source media="(max-width: 600px)" srcset="${config.URL_IMAGE_SMALL + restaurant.pictureId}">
<img class="lazyload"
    data-src="${config.URL_IMAGE_LARGE + restaurant.pictureId}" 
    alt="${restaurant.city}"></img>
</picture>
              </div>
              <div class="body-resto">
                <h3>Rating ${restaurant.rating}</h3>
                <h1>${restaurant.name}</h1>
                <div class="text">
                  <p>${restaurant.description}</p>
                </div>
              </div>
            </div>
      </a>
`
const keySearch = async () => {
  const input = document.querySelector('#search')
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      window.location.hash = `/search?q=${input.value}`
    }
  })
}

const searchNotFound = () => {
  return `
    <div class="notfound">
      <h1>Resto yang kamu cari tidak ada</h1>
    </div>
  `
}

const detailTemplate = (restaurant) => {
  return `
  <div class="detail-header">
  <picture>
  <source media="(max-width: 300px)" width="100%" srcset="${config.URL_IMAGE_SMALL + restaurant.pictureId}">
  <source media="(max-width: 700px)" width="100%" srcset="${config.URL_IMAGE_MEDIUM + restaurant.pictureId}">
  <img class="lazyload" width="100%"
      data-src="${config.URL_IMAGE_LARGE + restaurant.pictureId}" 
      alt="${restaurant.city}"></img>
  </picture>
  </div>
  <div class="detail-deskripsi">
    <div class="title-header">
        <h2>${restaurant.name}</h2>
        <h5>Rating ${restaurant.rating}</h5>
    </div>
  <p>${restaurant.description}</p>
  <p class="alamat">Alamat : ${restaurant.address + ' ' + restaurant.city}</p>
  <p id="category">Category : ${restaurant.categories.map(
      (e) => ' ' + e.name
  )}</p>
    <div class="menu">
      <h3>Menu</h3>
      <div class="list-menu">
          <div class="makanan">
              <h4>Makanan</h4>
              <ul class="list-foods">
              </ul>
          </div>
          <div class="minuman">
              <h4>Minuman</h4>
              <ul class="list-drinks">
              </ul>
          </div>
      </div>
    </div>
</div>
<div class="give-review">
  <h3>Beri Nilai? </h3>
  <div class="input-reviews">
      <input type="text" name="name" id="input-name" placeholder="Masukan nama kamu....">
      <textarea name="review" placeholder="Masukan Reviews...."  id="text-review" cols="20" rows="5"></textarea>
      <button type="button" id="submit">Submit</button>
  </div>
    <div class="reviews">
      <h3>Reviews</h3>
      <div class="list-reviews">
      </div>
    </div>
  </div>
  `
}

const listMenu = (menu) => {
  return `<li>${menu.name}</li>`
}

const listReviews = (review) => {
  return `
    <div class="review">
      <div>
        <p>${review.name}</p>
        <p>${review.date}</p>
      </div>
      <p>${review.review}</p>
    </div>
  `
}

const like = `
<img aria-label="like" id="like" src="images/favourite.svg"/>`

const liked = `
<img aria-label="liked" id="liked" src="images/star.svg"/>`

const detailsPart = (datas, selector, template) => {
  datas.forEach((data) => {
    document.querySelector(selector).innerHTML += template(data)
  })
}

export { listResto, keySearch, searchNotFound, detailTemplate, listReviews, listMenu, detailsPart, like, liked }
