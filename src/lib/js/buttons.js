const remote = require('electron').remote

let isMax = false

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
  if (!isMax)
    window.maximize()
  else
    window.unmaximize()
  isMax = !isMax
}, false)
