'use strict'
let learnjs = {}

learnjs.appOnReady = () => {
  window.onhashchange = () => {
    learnjs.showView(window.location.hash);
  }
  learnjs.showView(window.location.hash);
}

learnjs.problemView = (problemNumber) => {
  let view = $('.templates .problem-view').clone();
  view.find('.title').text('Problem #' + problemNumber + ' Coming soon!');
  return view;
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