import urlParser from '../../utils/url-parser'
import API from '../../globals/api'
import config from '../../globals/Config'
import {
  detailTemplate,
  listReviews,
  listMenu,
  detailsPart
} from '../template/template-resto'
import FavoriteBtn from '../../utils/favorite-btn'

const detail = {
  async render () {
    return `
        <div id="detail">
        </div>
        `
  },
  async afterRender () {
    const { id } = urlParser.urlWithout()
    const results = await new API(`${config.URL_API}detail/${id}`).fetcher()
    const detailPage = document.querySelector('#detail')
    detailPage.innerHTML += detailTemplate(
      results.restaurant
    )
    detailsPart(results.restaurant.menus.drinks, '.list-drinks', listMenu)
    detailsPart(results.restaurant.menus.foods, '.list-foods', listMenu)
    detailsPart(
      results.restaurant.customerReviews,
      '.list-reviews',
      listReviews
    )
    document.querySelector('#submit').addEventListener('click', async () => {
      const name = document.querySelector('#input-name').value
      const review = document.querySelector('#text-review').value
      const body = {
        id,
        name,
        review
      }
      const addReview = await new API(`${config.URL_API}review`).updateReview(
        body
      )
      console.log(addReview.customerReviews)
      detailsPart(addReview.customerReviews, '.list-reviews', listReviews)
    })
    const favoriteBtn = new FavoriteBtn(detailPage, results.restaurant)
    await favoriteBtn.render()
    const floating = document.querySelector('#floating')
    favoriteBtn.checkingButton(floating)
    favoriteBtn.buttonClick(floating)
  }
}

export default detail
