'use strict';

var learnjs = {};

learnjs.problemView = function(problemNumber) {
  var title = 'Problem #' + problemNumber + ' Coming soon!'
  return $('<div class="problem-view">').text(title);
}

learnjs.showView = function(hash) {
  var routes = {
    '#problem': learnjs.problemView
  };
  var hashParts = hash.split('-');
  var viewFn = routes[hashParts[0]];
  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
}

learnjs.appOnReady = function() {
  window.onhashchange = function() {
    learnjs.showView(window.location.hash);
  }
  learnjs.showView(window.location.hash);
}
>>>>>>> 8da2d22e08a61ade3b9cda0b8731aef4609f4fee
