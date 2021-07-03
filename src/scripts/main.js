import runtime from 'serviceworker-webpack-plugin/lib/runtime'

const notificationPermisions = async () => {
  if ('Notification' in window) {
    await Notification.requestPermission()
  }
}

const loadingPage = () => {
  window.setTimeout(() => {
    document.querySelector('.loading').style.visibility = 'visible'
  }, 0)

  window.setTimeout(() => {
    document.querySelector('.loading').style.visibility = 'hidden'
  }, 3500)
}

const registerSW = async () => {
  if ('serviceWorker' in navigator) {
    // await runtime.register()
    await navigator.serviceWorker.register('./sw.js')
    notificationPermisions()
  } else {
    console.log('gl support cuy')
  }
}

export default registerSW
export { loadingPage }
