'use strict';
let learnjs = {};
learnjs.problems = [
  {
    description: 'What is truth?',
    code: 'function problem() { return __; }',
  },
  {
    description: 'Simple Math',
    code: 'function problem() { return 42 === 6 * __; }',
  },
];
learnjs.appOnReady = () => {
  window.onhashchange = () => {
    learnjs.showView(window.location.hash);
  };
  learnjs.showView(window.location.hash);
};

learnjs.applyObject = function(obj, elem) {
  for (let key in obj) {
    elem.find('[data-name="' + key + '"]').text(obj[key]);
  }
};

learnjs.problemView = (data) => {
  let problemNumber = parseInt(data, 10);
  let view = $('.templates .problem-view').clone();
  view.find('.title').text('Problem #' + problemNumber);
  learnjs.applyObject(learnjs.problems[problemNumber], view);
  return view;
};

learnjs.showView = (hash) => {
  let routes = {
    '#problem': learnjs.problemView,
  };
  let hashParts = hash.split('-');
  let viewFn = routes[hashParts[0]];
  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
};

