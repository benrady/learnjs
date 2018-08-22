'use strict'
var learnjs = {}

learnjs.appOnReady = function() {
  window.onhashchange = function() {
    learnjs.showView(window.location.hash)
  }
  learnjs.showView(window.location.hash)
}

learnjs.problemView = function(problemNumber) {
  var title = 'Problem #' + problemNumber + ' Coming soon!'
  console.log(title)
  return $('<div class="problem-view">').text(title)
}

learnjs.showView = function(hash) {
  var routes = {
    '#problem': learnjs.problemView
  }
  var hashParts = hash.split('-')
  var viewFn = routes[hashParts[0]]

  if (viewFn) {
    $('.view-container')
      .empty()
      .append(viewFn(hashParts[1]))
  }
}
