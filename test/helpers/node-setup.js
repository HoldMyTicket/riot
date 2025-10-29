const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
global.window = dom.window
global.document = dom.window.document
// Copy all window properties to global
Object.getOwnPropertyNames(dom.window).forEach((key) => {
  if (!(key in global)) {
    global[key] = dom.window[key]
  }
})
