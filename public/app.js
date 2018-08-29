'use strict'
var learnjs = {}

learnjs.problems = [
  {
    description: 'What is truth?',
    code: 'function problem() {return __;}'
  },
  {
    description: 'Simple Math',
    code: 'function problem() {return 42 === 6 * __;}'
  }
]

learnjs.flashElement = function(elem, content) {
  elem.fadeOut('fast', function() {
    elem.html(content)
    elem.fadeIn()
  })
}

learnjs.triggerEvent = function(name, args) {
  $('.view-container>*').trigger(name, args)
  console.log(name + ' is triggered')
}

learnjs.applyObject = function(obj, elem) {
  for (var key in obj) {
    elem.find('[data-name="' + key + '"]').text(obj[key])
  }
}

learnjs.appOnReady = function() {
  window.onhashchange = function() {
    learnjs.showView(window.location.hash)
  }
  learnjs.showView(window.location.hash)
}

learnjs.template = function(name) {
  return $('.templates ' + name).clone()
}
learnjs.problemView = function(problemNumber) {
  // copy template
  var parsedNumber = parseInt(problemNumber, 10)
  var problemData = learnjs.problems[parsedNumber - 1]
  var view = learnjs.template('.problem-view')

  if (parsedNumber < learnjs.problems.length) {
    var buttonItem = learnjs.template('.skip-btn')
    buttonItem.find('a').attr('href', '#problem-' + (1 * problemNumber + 1))
    $('.nav-list').append(buttonItem)
    view.bind('removingView', function() {
      buttonItem.remove()
    })
  }

  // create result area
  var resultFlash = view.find('.result')

  function checkAnswer() {
    var answer = view.find('.answer').val()
    var test = problemData.code.replace('__', answer) + '; problem()'
    return eval(test)
  }
  var buildCorrectFlash = function(problemNum) {
    var correctFlash = learnjs.template('.correct-flash')
    var link = correctFlash.find('a')
    if (problemNum < learnjs.problems.length) {
      link.attr('href', '#problem-' + (1 * problemNumber + 1))
    } else {
      link.attr('href', '') //all problems solved
      link.text("You're finished")
    }
    return correctFlash
  }

  var checkAnswerClick = function() {
    if (checkAnswer()) {
      var correctFlash = buildCorrectFlash(problemNumber)

      learnjs.flashElement(resultFlash, correctFlash)
    } else {
      learnjs.flashElement(resultFlash, 'Incorrect!')
    }
    return false //prevent rerendering
  }

  // show Q
  view.find('.check-btn').click(checkAnswerClick)
  view.find('.title').text('Problem #' + parsedNumber)
  learnjs.applyObject(problemData, view)
  return view
}

learnjs.landingView = function() {
  return learnjs.template('.landing-view')
}

learnjs.showView = function(hash) {
  var routes = {
    '#problem': learnjs.problemView,
    '#': learnjs.landingView,
    '': learnjs.landingView
  }
  var hashParts = hash.split('-')
  var viewFn = routes[hashParts[0]]

  if (viewFn) {
    learnjs.triggerEvent('removingView')
    $('.view-container')
      .empty()
      .append(viewFn(hashParts[1]))
  }
}
