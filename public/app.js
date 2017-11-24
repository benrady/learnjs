
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
        '#problem': learnjs.problemView,
        '#': learnjs.landingView,
        '': learnjs.landingView,
        '#newfeed': learnjs.newFeedView
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]] // #problem -> learnjs.problemView
    if (viewFn) {
        learnjs.triggerEvent('removingView',[]);
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }

}


Array.prototype.first = function () {
    return this[0];
};



learnjs.newFeedView = function() {
    var url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
    fetch(url).then(function(response) {
        return response.json();
      }).then(function(json) {
          console.log(json);
          var beerShopsView = learnjs.whatsNewView(json.result);
          learnjs.render(beerShopsView);
          learnjs.readContinue(beerShopsView);
          
      });
}

learnjs.render = function(view) {
    learnjs.triggerEvent('removingView',[]);
    $('.view-container').empty().append(view);
}

learnjs.whatsNewView = function (whatsNews) {
    var beerShopsView = learnjs.template('beer-shops-view');

        $.each(whatsNews, function(i, whatsNew){
            var shopView = learnjs.template('beer-shop-view');
            if(whatsNew.message){
                whatsNew.message = whatsNew.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
            }
            learnjs.applyObject(whatsNew, shopView);
            beerShopsView.append(shopView);
        });
        return beerShopsView
}

/**-------------------------
 * 続きをよむセットアップ
 -------------------------*/
var itemHeights = [];
learnjs.readContinue = function(beerShopsView)  {
    learnjs.hideMessage(beerShopsView);
    learnjs.showMessage(beerShopsView);
}
learnjs.hideMessage = function(beerShopsView)  {
    beerShopsView.find('.grad-item').each(function() {
        var thisHeight = $(this).height();
        itemHeights.push(thisHeight);
        $(this).addClass('is-hide');
    });
}

learnjs.showMessage = function(beerShopsView) {
    beerShopsView.find('.grad-trigger').on('click', function() {
        var index = $(this).index('.grad-trigger');
        var addHeight = itemHeights[index];
        $(this).fadeOut().addClass('is-show').next().animate(
            {height: addHeight}, 200
        ).removeClass('is-hide');
    })
}

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

learnjs.triggerEvent = function(name, args) {
    $('.view-container>*').trigger(name, args);
}