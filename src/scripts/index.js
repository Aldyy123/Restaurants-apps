import 'regenerator-runtime' /* For async await transpile */
import '../styles/main.css'
import '../styles/medium.css'
import '../styles/mobile.css'
import '../public/images/logo.png'
import '../public/spinner.gif'
import App from './views/app'
import registerSW, { loadingPage } from './main'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const burger = document.querySelector('.mobilenav')
const nav = document.querySelector('.drawer-nav')
const body = document.querySelector('body')

const mainContent = document.querySelector('#main')
const app = new App(mainContent, body, burger, nav)

import('lodash.filter')
.then((module) => module.default)
.then(app)
.catch((err) => alert(err))

window.addEventListener('hashchange', () => {
  app.render()
})

window.addEventListener('load', async () => {
  loadingPage()
  app.render()
  registerSW()
})
