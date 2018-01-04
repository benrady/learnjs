'use strict'
let learnjs = {}
learnjs.showView = (hash) => {
  let problemView = $('<div class="problem-view">').text('Coming soon!');
  $('.view-container').empty().append(problemView);
}
