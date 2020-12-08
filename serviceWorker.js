const staticDevCoffee = "Covid Egypt"
const assets = [
  "/",
  "/index.html",
  "/Css/style.css",
  "/Js/script.js",
  "/Js/skycons.js",
  "/Img/about.svg",
  "/Img/dots.png",
  "Img/market-launch-pana.svg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})