class UrlParser {
  static urlWithout () {
    const url = window.location.hash.slice(1).toLocaleLowerCase()
    return this._urlSplitter(url)
  }

  static urlCombiner () {
    const url = window.location.hash.slice(1).toLocaleLowerCase()
    const spliter = this._urlSplitter(url)
    return this._urlCombiner(spliter)
  }

  static urlSearcher () {
    const url = window.location.hash.slice(1).toLocaleLowerCase()
    return url.split('?')[1].slice(2)
  }

  static _urlSplitter (url) {
    const split = url.split('/')
    return {
      resource: split[1] || null,
      id: split[2] || null,
      verb: split[3] || null
    }
  }

  static _urlCombiner (splitedUrl) {
    return (
      (splitedUrl.resource
        ? splitedUrl.resource.startsWith('search')
          ? `/${splitedUrl.resource.slice(0, 9)}:query`
          : `/${splitedUrl.resource}`
        : '/') +
      (splitedUrl.id ? '/:id' : '') +
      (splitedUrl.verb ? `/${splitedUrl.verb}` : '')
    )
  }
}

export default UrlParser
