
'use strict';

import WhatsNew from "./WhatsNew.js";
import CommonView from "./CommonView.js";

// private instance
const commonView = Symbol();
const whatsNewView = Symbol();


class CraftBeerLoves {
    constructor() {
        this[commonView] = new CommonView();
        this[whatsNewView] = new WhatsNew();

        this.appOnReady();
    }

    appOnReady() {
        window.addEventListener('hashchange', () => this.showView(window.location.hash));
        this.showView(window.location.hash);
    }
  
    showView(hash) {
        let routes = {
            '#problem': learnjs.problemView,
            '#googleads': this[whatsNewView].create(),
            '#': this[whatsNewView].create(),
            '': this[whatsNewView].create()
        };
        let hashParts = hash.split('-');
        let viewFn = routes[hashParts[0]] // #problem -> learnjs.problemView
        if (viewFn) {
            this[commonView].render(viewFn(hashParts[1]));
        }
    }
}
export default CraftBeerLoves;


window.addEventListener('load', () => new CraftBeerLoves());

Array.prototype.first = function () {
    return this[0];
};





//////////////////////////////////////
// 以下は不要
// 参考になりそうな部分もあるので残している
//////////////////////////////////////
export var learnjs = {};

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

/**
 * ランディングページViewを取得
 */
learnjs.landingView = function() {
    return learnjs.template('landing-view');
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
            learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber));
            return false;
        }
        learnjs.flashElement(resultFlash, 'Incorrect!');
        return false;
    }

    if(problemNumber < learnjs.problems.length) {
        var buttonItem = learnjs.template('skip-btn');
        buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
        $('.nav-list').append(buttonItem);
        view.bind('removingView', function(){
            buttonItem.remove();
        });
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text(title);
    learnjs.applyObject(problemData, view)
    return view;
}

// bind data
learnjs.applyObject = function(obj, elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').html(obj[key]);
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

learnjs.buildCorrectFlash = function(problemNumber) {
    var correctFlash = learnjs.template('correct-flash');
    var link = correctFlash.find('a');
    if(problemNumber < learnjs.problems.length) {
        link.attr('href','#problem-' + (problemNumber + 1));
        return correctFlash;
    }
    link.attr('href', '');
    link.text("You're Finished!");
    return correctFlash;
}


