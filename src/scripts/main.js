import runtime from 'serviceworker-webpack-plugin/lib/runtime'

const notificationPermisions = async () => {
  if ('Notification' in window) {
    await Notification.requestPermission()
  }
}

const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    // Runtime Di jalankan untuk development
    await runtime.register()
    // await navigator.serviceWorker.register('./sw.js')
    notificationPermisions()
  } else {
    console.log('gl support cuy')
  }
}

export default registerSW
