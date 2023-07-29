import FavouriteBtn from '../src/scripts/utils/favorite-btn'
import API from '../src/scripts/globals/api'
import config from '../src/scripts/globals/Config'
import favouriteDb from '../src/scripts/utils/FavoriteDB'

describe('Favourite Button', () => {
  beforeEach(() => {
    document.body.innerHTML = `<div id="detail">
    </div>`
  })
  it('should show the like button', async () => {
    const detail = document.querySelector('#detail')
    const data = {
      id: 'w9pga3s2tubkfw1e867',
      name: 'mbuh',
    }
    const btn = new FavouriteBtn(detail, data)
    await btn.render()
    const floating = document.querySelector('#floating')
    await btn.checkingButton(floating)
    // console.log(document.querySelector('#like'))
    expect(document.querySelector('#like')).toBeDefined()
  })
  it('should be able to like the Restaurant', async () => {
    const detail = document.querySelector('#detail')
    const data = {
      id: 1
    }
    const btn = new FavouriteBtn(detail, data)
    await btn.render()
    const floating = document.querySelector('#floating')
    floating.dispatchEvent(new Event('click'))
    await btn.insertDataClick(floating)
    const resto = await favouriteDb.getResto(1)
    expect(resto).toEqual({ id: 1 })
    favouriteDb.deleteFavorite(1)
  })
  it('should be able to remove liked Restaurant', async () => {
    const detail = document.querySelector('#detail')
    const data = {
      id: 1
    }
    const btn = new FavouriteBtn(detail, data)
    await btn.render()
    const floating = document.querySelector('#floating')
    floating.dispatchEvent(new Event('click'))
    await btn.insertDataClick(floating)
    const allResto = await favouriteDb.getAll()
    expect(allResto).toEqual([])
  })
})

describe('Form Search', () => {
  beforeEach(() => {
    document.body.innerHTML = '<input type="text" name="search" id="search">'
  })
  it('should fill out the search form if one result', async () => {
    const input = (document.querySelector('#search').value = 'bring')
    const api = new API(config.URL_API + 'search?q=' + input)
    const results = await api.fetcher()
    expect(results.founded).toEqual(1)
  })
  it('should not found searching', async () => {
    const input = (document.querySelector('#search').value = 'alskds')
    const api = new API(config.URL_API + 'search?q=' + input)
    const results = await api.fetcher()
    expect(results.founded).toEqual(0)
  })
})

describe('insert Review', () => {
  beforeEach(() => {
    document.body.innerHTML = `<input type="text" name="search" id="input-name">
    <textarea name="review" placeholder="Masukan Reviews...."  id="text-review" cols="20" rows="5"></textarea>
      <button type="button" id="submit">Submit</button>`
  })
  it('should insert new review', async () => {
    const name = (document.querySelector('#input-name').value = 'alo')
    const review = (document.querySelector('#text-review').value = 'Ini keren')
    document.querySelector('#submit').dispatchEvent(new Event('submit'))
    const addReview = await new API(`${config.URL_API}review`).updateReview({
      id: 'uqzwm2m981kfw1e867',
      name,
      review,
    })
    expect(addReview.error).toBeFalsy()
  })
})
