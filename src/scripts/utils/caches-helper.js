import config from '../globals/Config'

class CachesHelper {
  static async installing (nameCaches) {
    const cache = await this._openCache()
    return cache.addAll(nameCaches)
  }

  static async revalidate (request) {
    const response = await caches.match(request)
    if (response) {
      return response
    }

    return this._fetching(request)
  }

  static async deleteOldCache () {
    const cachesName = await caches.keys()
    cachesName
      .filter((cache) => cache !== config.NAME_CACHE)
      .map((filteredName) => caches.delete(filteredName))
  }

  static async _openCache () {
    return caches.open(config.NAME_CACHE)
  }

  static async _fetching (request) {
    const response = await fetch(request)
    if (response || response === 200) {
      await this._addCache(request)
      return response
    }

    return response
  }

  static async _addCache (request) {
    const cache = await this._openCache()
    cache.add(request)
  }
}

export default CachesHelper
