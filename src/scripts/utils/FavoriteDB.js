import { openDB } from 'idb'
import config from '../globals/Config'

const dbPromise = openDB(config.IDB_NAME, config.IDB_VERSION, {
  upgrade (database) {
    database.createObjectStore(config.OBJECT_STORE_NAME, {
      keyPath: 'id'
    })
  }
})

class FavoriteResto {
  async getAll () {
    return (await dbPromise).getAll(config.OBJECT_STORE_NAME)
  }

  async insertFavorite (value) {
    return (await dbPromise).put(config.OBJECT_STORE_NAME, value)
  }

  async getResto (id) {
    return (await dbPromise).get(config.OBJECT_STORE_NAME, id)
  }

  async deleteFavorite (value) {
    return (await dbPromise).delete(config.OBJECT_STORE_NAME, value.id)
  }
}

const FavoriteDB = new FavoriteResto()

export default FavoriteDB
