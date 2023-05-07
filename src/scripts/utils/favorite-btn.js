import FavoriteDB from './FavoriteDB'
import config from '../globals/Config'
import { like, liked } from '../views/template/template-resto'

class FavoriteButton {
  constructor (element, restaurant) {
    this._element = element
    this._restaurant = restaurant
  }

  async render () {
    this._element.innerHTML += '<button id="floating"></button>'
    return document.querySelector('#floating')
  }

  async checkingButton (floating) {
    if (await this._isExisting(this._restaurant.id)) {
      floating.innerHTML += liked
    } else {
      floating.innerHTML += like
    }
  }

  buttonClick (floating) {
    floating.addEventListener('click', async () => {
      await this.insertDataClick(floating)
    })
  }

  async insertDataClick (floating) {
    if (await this._isExisting(this._restaurant.id)) {
      floating.innerHTML = like
      await this._showNotifications('Di hapus dari database', this._restaurant)
      return this._deleteResto(this._restaurant)
    } else {
      floating.innerHTML = liked
      await this._putResto(this._restaurant)
      return this._showNotifications('Di Tambahkan ke database', this._restaurant)
    }
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
    console.log('Notification log')
    if (Notification.permission === 'granted') {
      const notification = await navigator.serviceWorker.ready
      console.log('React native handle has been added')
      if (window.ReactNativeWebView) {
        // send data object to React Native (only string)
        window.ReactNativeWebView.postMessage(JSON.stringify({
          title,
          name: restaurant.name,
          image: config.URL_IMAGE_MEDIUM + restaurant.pictureId
        }))
      }
      return notification.showNotification(restaurant.name, {
        body: title,
        image: config.URL_IMAGE_MEDIUM + restaurant.pictureId
      })
    }
  }
}

export default FavoriteButton
