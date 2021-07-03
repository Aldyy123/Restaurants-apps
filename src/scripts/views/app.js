import UrlParser from '../utils/url-parser'
import Routes from '../routes/routes'

class App {
  constructor (content, body, burger, nav) {
    this._content = content
    this._body = body
    this._burger = burger
    this._nav = nav
  }

  async render () {
    this.collapse()
    const url = UrlParser.urlCombiner()
    const route = Routes[url]
    this._content.innerHTML = await route.render()
    await route.afterRender()
  }

  collapse () {
    this._burger.addEventListener('click', (e) => {
      this._nav.classList.toggle('open')
      e.stopPropagation()
    })
    this._body.addEventListener('click', (e) => {
      this._nav.classList.remove('open')
      e.stopPropagation()
    })
  }
}

export default App
