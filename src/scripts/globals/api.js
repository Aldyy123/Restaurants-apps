class API {
  constructor (url) {
    this._url = url
  }

  async fetcher () {
    const api = await fetch(this._url)
    return api.json()
  }

  async updateReview (text) {
    const api = await fetch(this._url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 12345
      },
      body: JSON.stringify(text)
    })
    return api.json()
  }
}

export default API
