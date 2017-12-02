
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
        '#': learnjs.newFeedViewWithProgress,
        '': learnjs.newFeedViewWithProgress
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



learnjs.newFeedViewWithProgress = function () {
    const url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
    learnjs.showProgress();
    fetch(url).then(function(response) {
        return response.json();
      }).then(function(json) {
        learnjs.hideProgress();
          console.log(json);
          var whatsNewView = learnjs.whatsNewView(json.result);
          learnjs.render(whatsNewView);
          learnjs.readContinue(whatsNewView);
      }).catch( (error) => {
        learnjs.hideProgress();
          console.log(error);
      });
}

learnjs.showProgress = () => {
    learnjs.hideSideBar();
    $('#progress').show();
}

learnjs.hideProgress = () => {
    $('#progress').hide();
    learnjs.showSideBar();
}

learnjs.showSideBar = () => {
    $('#sidebar-container').show();
}
learnjs.hideSideBar = () => {
    $('#sidebar-container').hide();
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

            whatsNew.createdAt = learnjs.toLocaleDateString(whatsNew.createdAt)
            console.log(whatsNew);
            shopView.find('a').filter('.fbUrl').attr('href', whatsNew.fbUrl);

            if (whatsNew.photos.length > 0) {
                shopView.find('.scaledImage').attr('src', whatsNew.photos[0].src);
            }
            learnjs.applyObject(whatsNew, shopView);
            beerShopsView.append(shopView);
        });
        return beerShopsView
}

learnjs.toLocaleDateString = function (date) {
    var ms = learnjs.parseDate(date);
    return (new Date(ms)).toLocaleString();
}
// ChromeとSafariでDateの扱いが異なる
// https://stackoverflow.com/a/42151174
learnjs.parseDate = function (date) {
    var parsed = Date.parse(date);
    if (!isNaN(parsed)) {
      return parsed;
    }
    return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
}

/**-------------------------
 * 続きをよむセットアップ
 -------------------------*/
var itemHeights = [];
learnjs.readContinue = function(beerShopsView)  {
    learnjs.hideMessage(beerShopsView);
    learnjs.onClickReadContinueButton(beerShopsView);
}
learnjs.hideMessage = function(beerShopsView)  {
    beerShopsView.find('.grad-item').each(function() {
        var originalHeight = $(this).height();
        $(this).addClass('is-hide');
        var shortHeight = $(this).height();
        itemHeights.push({original: originalHeight, short:shortHeight});
    });
}

learnjs.onClickReadContinueButton = function(beerShopsView) {
    beerShopsView.find('.grad-trigger').on('click', function() {
        var index = $(this).index('.grad-trigger');
        var height = itemHeights[index];
        if(!$(this).hasClass('is-show')) {
            $(this).addClass('is-show').next().animate(
                {height: height.original}, 200
            ).removeClass('is-hide');
            return;
        }
        $(this).removeClass('is-show').next().animate(
            {height:height.short},200
        ).addClass('is-hide');
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