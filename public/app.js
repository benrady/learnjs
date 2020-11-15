'use strict';
var learnjs = {};

learnjs.problemView = function() {
  return $('<div class="problem-view">').text('Coming soon!');
}

learnjs.showView = function(hash) {
  var routes = {
    '#problem-1': learnjs.problemView
  };
  var viewFn = routes[hash];
  if (viewFn) {
    $('.view-container').empty().append(viewFn());
  }
}
