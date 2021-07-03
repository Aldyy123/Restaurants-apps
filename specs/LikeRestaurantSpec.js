import FavouriteBtn from '../src/scripts/utils/favorite-btn'
import API from '../src/scripts/globals/api'
import config from '../src/scripts/globals/Config'

describe('Favourite Button', () => {
  beforeEach(() => {
    document.body.innerHTML = ` <button  id="floating">
     </button>`
  })
  it('should favourite button into idb', async () => {
    const floating = document.querySelector('#floating')
    const data = {
      id: 'w9pga3s2tubkfw1e867',
      name: 'mbuh',
    }
    floating.dispatchEvent(new Event('click'))
    const btn = new FavouriteBtn(floating, data)
    await btn.render()
    expect(document.querySelector('[aria-label="like"]')).toBeTruthy()
  })
  it('should unfavourite button into idb', async () => {
    const floating = document.querySelector('#floating')
    const data = {
      id: 'w9pga3s2tubkfw1e867',
      name: 'mbuh',
    }
    floating.dispatchEvent(new Event('click'))
    const btn = new FavouriteBtn(floating, data)
    await btn.render()
    expect(document.querySelector('[aria-label="liked"]')).toBeTruthy()
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
