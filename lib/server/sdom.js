// Use global document if available (jsdom in tests), else fallback to simple-dom
var doc
if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
  doc = document
} else {
  var simpleDom = require('simple-dom')
  doc = new simpleDom.Document()
}
module.exports = doc

// ...existing code...
var sdom = {
  parse: function(html) {
    // parse html string to simple-dom document
    var blank = new simpleDom.Document()
    var parser = new simpleDom.HTMLParser(simpleTokenizer.tokenize, blank, simpleDom.voidMap)
    return parser.parse(html)
  },
  serialize: function(doc) {
    // serialize simple-dom document to html string
    var serializer = new simpleDom.HTMLSerializer(simpleDom.voidMap)
    return serializer.serialize(doc)
  }
}
