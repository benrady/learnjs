'use strict';
var learnjs = {};

learnjs.problems = [
    {
        description: "What is truth?",
        code: "function problem() { return __; }"
    },
    {
        description: "Simple Math",
        code: "function problem() { return 42 === 6 * __; }"
    }
];

learnjs.appOnReady = function() {
    window.onhashchange = function() {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
}

learnjs.showView = function(hash) {
    var routes = {
        '#problem': learnjs.problemView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]] // #problem -> learnjs.problemView
    if (viewFn) {
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
}



learnjs.problemView = function(data) {

    var problemNumber = parseInt(data, 10)
    var view = learnjs.template('problem-view');
    var title = 'Problem #' + problemNumber;
    var resultFlash = view.find('.result');
    var problemData = learnjs.problems[problemNumber - 1 ];

    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__',answer) + '; problem();';
        return eval(test);
    }

    function checkAnswerClick() {
        if(checkAnswer()){
            var correctFlash = learnjs.template('correct-flash');
            correctFlash.find('a').attr('href', '#problem-' + (problemNumber + 1));
            learnjs.flashElement(resultFlash, correctFlash);
            return false;
        }
        learnjs.flashElement(resultFlash, 'Incorrect!');
        return false;
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text(title);
    learnjs.applyObject(problemData, view)
    return view;
}

// bind data
learnjs.applyObject = function(obj, elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').text(obj[key]);
    }
}

learnjs.flashElement = function(elem, content) {
    elem.fadeOut('fast', function() {
        elem.html(content);
        elem.fadeIn();
    })
}

// templateからコピー
learnjs.template = function(name) {
    return $('.templates .' + name).clone();
}