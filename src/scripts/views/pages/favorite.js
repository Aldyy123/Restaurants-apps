import FavoriteDb from '../../utils/FavoriteDB'
import { listResto } from '../template/template-resto'
const favorite = {
  async render () {
    return `
            <div class="title-center">
                <h1>Favorite Restoran</h1>
            </div>
            <section class="restoran" id="favorite"></section>
            `
  },

  async afterRender () {
    const listFavorites = await FavoriteDb.getAll()
    const favorite = document.querySelector('#favorite')
    listFavorites.forEach((listFavorite) => {
      favorite.innerHTML += listResto(listFavorite)
    })
  }
}

export default favorite
