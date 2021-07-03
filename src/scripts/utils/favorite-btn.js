import FavoriteDB from './FavoriteDB'
import config from '../globals/Config'
import { like, liked } from '../views/template/template-resto'

class FavoriteButton {
  constructor (element, restaurant) {
    this._element = element
    this._restaurant = restaurant
  }

  async render () {
    if (await this._isExisting(this._restaurant.id)) {
      await this._deleteResto(this._restaurant)
      this._element.innerHTML = like
      return this._showNotifications('Di hapus dari database', this._restaurant)
    }
    this._element.innerHTML = liked
    await this._putResto(this._restaurant)
    return this._showNotifications('Di Tambahkan ke database', this._restaurant)
  }

  async _isExisting (id) {
    return FavoriteDB.getResto(id)
  }

  async _putResto (restaurant) {
    return FavoriteDB.insertFavorite(restaurant)
  }

  async _deleteResto (id) {
    return FavoriteDB.deleteFavorite(id)
  }

  async _showNotifications (title, restaurant) {
    if (Notification.permission === 'granted') {
      const notification = await navigator.serviceWorker.ready
      return notification.showNotification(restaurant.name, {
        body: title,
        image: config.URL_IMAGE + restaurant.pictureId
      })
    }
  }
}

export default FavoriteButton
