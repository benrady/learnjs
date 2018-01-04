'use strict'
let learnjs = {}

learnjs.problemView = () => {
  return $('<div class="problem-view">').text('Coming soon!');
}

learnjs.showView = (hash) => {
  let routes = {
    '#problem': learnjs.problemView
  }
  let hashParts = hash.split('-');
  let viewFn = routes[hashParts[0]];
  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
}