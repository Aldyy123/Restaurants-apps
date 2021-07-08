import 'regenerator-runtime'
import CachesHelper from './utils/caches-helper'
const { assets } = global.serviceWorkerOption

self.addEventListener('install', async (e) => {
  console.log('installing service worker')
  e.waitUntil(CachesHelper.installing([...assets, '/']))
})

self.addEventListener('activate', async (e) => {
  console.log('Activate')
  e.waitUntil(CachesHelper.deleteOldCache())
})

self.addEventListener('fetch', async (e) => {
  e.respondWith(CachesHelper.revalidate(e.request))
})
