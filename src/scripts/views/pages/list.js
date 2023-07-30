import { listResto, keySearch } from '../template/template-resto'
import API from '../../globals/api'
import config from '../../globals/Config'

const List = {
  async render () {
    return `
    <section class="landing">
      <div class="jumbotron">
      <picture>
        <source media="(max-width: 600px)" srcset="images/heros/hero-image_2-small.jpg">
        <img 
        src="images/heros/hero-image_2-large.jpg" 
        width="100%"
        alt="Image"/>
      </picture>
        <div class="text-landing">
          <h2>Nyari Tempat nongkrong??</h2>
          <h4>Yuk cari tempat kumpul yang pas dan nyaman</h4>
        </div>
      </div>
    </section>
        <div class="title-center">
            <h1>Explore Restoran</h1>
            <div class="search">
            <label for="search">Searching </label>
            <input type="text" name="search" id="search">
          </div>
        </div>
        <section class="restoran" id="list"></section>
        `
  },

  async afterRender () {
    const resto = document.querySelector('section.restoran')
    const api = new API(config.URL_API + 'list')
    const results = await api.fetcher()
    await keySearch()
    results.restaurants.forEach((restaurant) => {
      resto.innerHTML += listResto(restaurant)
    })
  }
}

export default List
