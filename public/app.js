'use strict'
let learnjs = {}

learnjs.problemView = () => {
  return $('<div class="problem-view">').text('Coming soon!');
}

learnjs.showView = (hash) => {
  let routes = {
    '#problem-1': learnjs.problemView
  }
  let viewFn = routes[hash];
  if (viewFn) {
    $('.view-container').empty().append(viewFn());
  }
}