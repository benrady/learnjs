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
  let view = learnjs.template('problem-view');
  let problemData = learnjs.problems[problemNumber - 1];
  let resultFlash = view.find('.result');

  let checkAnswer = () => {
    let answer = view.find('.answer').val();
    let test = problemData.code.replace('__', answer) + '; problem();';
    return eval(test);
  };

  let checkAnswerClick = () => {
    if (checkAnswer()) {
      let correctFlash = learnjs.buildCorrectFlash(problemNumber);
      learnjs.flashElement(resultFlash, correctFlash);
    } else {
      learnjs.flashElement(resultFlash, 'Incorrect!');
    }
    return false;
  };

  view.find('.check-btn').click(checkAnswerClick);
  view.find('.title').text('Problem #' + problemNumber);
  learnjs.applyObject(problemData, view);
  return view;
};

learnjs.showView = (hash) => {
  let routes = {
    '#problem': learnjs.problemView,
    '#': learnjs.landingView,
    '': learnjs.landingView,
  };
  let hashParts = hash.split('-');
  let viewFn = routes[hashParts[0]];
  if (viewFn) {
    $('.view-container').empty().append(viewFn(hashParts[1]));
  }
};

learnjs.flashElement = (elem, content) => {
  elem.fadeOut('fast', () => {
    elem.html(content);
    elem.fadeIn();
  });
};

learnjs.template = (name) => {
  return $('.templates .' + name).clone();
};

learnjs.buildCorrectFlash = (problemNumber) => {
  let correctFlash = learnjs.template('correct-flash');
  let link = correctFlash.find('a');
  if (problemNumber < learnjs.problems.length) {
    link.attr('href', '#problem-' + (problemNumber + 1));
  } else {
    link.attr('href', '');
    link.text('You\'re Finished!');
  }
  return correctFlash;
};

learnjs.landingView = function() {
  return learnjs.template('landing-view');
};

