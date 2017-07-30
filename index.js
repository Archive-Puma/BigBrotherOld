// Electron Remote Constants
const {remote} = require('electron')
const main = remote.require('./main.js')
// Connect to DB
const db = require('mongojs')('127.0.0.1/bigbrother', ['twitter'])

/** FUNCTIONS >>
======================= */
// sleep time expects milliseconds
let sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// loading page
let loading = () => {
  document.getElementById('content').innerHTML = `
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>`
}

let twitterGathering = (query) => {
  // get Twitter creds
  var Twitter = remote.require('./public/js/creds.js').Twitter
  // search Twitter users
  Twitter.get('users/search', { 'q': query, count: 5 }, (error, data) => {
    // handle the error
    if (error) {
      console.log(error.getMessage())
      return
    }
    // split information
    for (var profile in data) {
      // save information
      db.twitter.save({
        userID: data[profile]['id_str'],
        user: data[profile]['screen_name'],
        name: data[profile]['name'],
        location: data[profile]['location'],
        description: data[profile]['description'],
        url: data[profile]['url'],
        protected: data[profile]['protected'],
        following: data[profile]['friends_count'],
        followers: data[profile]['followers_count'],
        lang: data[profile]['lang'],
        profile_image: data[profile]['profile_image_url_https']
      })
    }
  })
}

/** WINDOW BUTTONS >>
======================= */
document.getElementById('close-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.close()
}, false)

document.getElementById('min-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  window.minimize()
}, false)

document.getElementById('zoom-btn').addEventListener('click', () => {
  var window = remote.getCurrentWindow()
  if (!window.isMaximized()) {
    window.maximize()
  } else {
    window.unmaximize()
  }
}, false)

/** DATABASE BUTTONS >>
======================= */
document.getElementById('search-btn').addEventListener('click', () => {
  // Rewrite DB
  db.twitter.drop()
  // Get twitter irformation
  twitterGathering(document.getElementById('target').value)
  // Wait with a Loading Page
  loading()
  // Set time to wait to 3s
  sleep(3000).then(() => {
    db.twitter.find({}, (error, data) => {
      if (!error) {
        main.results('twitter', data)
      }
    })
  })
})
