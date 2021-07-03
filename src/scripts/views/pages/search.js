import API from '../../globals/api'
import config from '../../globals/Config'
import urlParser from '../../utils/url-parser'
import { listResto, keySearch, searchNotFound } from '../template/template-resto'

const Search = {
  async render () {
    return `
        <div class="title-center">
            <h1>Resto yang kamu cari</h1>
            <div class="search">
            <label for="search">Searching </label>
            <input type="text" name="search" id="search">
          </div>
        </div>
        <section class="restoran" id="list"></section>
        `
  },

  async afterRender () {
    const query = await urlParser.urlSearcher()
    const results = await new API(config.URL_API + `search?q=${query}`).fetcher()
    await keySearch()
    const list = await document.querySelector('#list')
    if (results.restaurants.length > 0) {
      results.restaurants.forEach((e) => {
        list.innerHTML += listResto(e)
      })
    } else {
      list.innerHTML += searchNotFound()
    }
  }
}

export default Search
