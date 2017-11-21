
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

learnjs.beerShops = [
    {
        name: "BEER PUB Takumiya",
        id: "oikekarasuma"
    },
    {
        name: "肉ビアバールFujiyama",
        id: "nikubeer.fujiyama"
    },
    {
        name: "Craft Beer GULP",
        id: "gulp.pablojikesso"
    },
    {
        name: "B&G Nicholson（ビーエンジーニコルソン）",
        id: "bgnicho"
    },
    {
        name: "Tap beer club VEND",
        id: "vendbeer"
    }
];

learnjs.appOnReady = function() {
    window.onhashchange = function() {
        learnjs.showView(window.location.hash);
        learnjs.fbsetup();
    };
    learnjs.showView(window.location.hash);
    learnjs.fbsetup();
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

learnjs.fbsetup = function (){
    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/ja_JP/sdk.js', function(){
      FB.init({
        appId: '840268289473249',
        version: 'v2.11' // or v2.1, v2.2, v2.3, ...
      });

      var shops = learnjs.beerShops.map(function(obj){
        return obj.id;
      }).join(',');


      FB.api(
        '/feed',
        'GET',
        {"ids":shops , "fields" : "attachments,message", "access_token": learnjs.config.facebook_access_token},
        function(response) {
            var view = learnjs.newFeedViewWrap(response);

            // TODO: 共通化
            learnjs.triggerEvent('removingView',[]);
            $('.view-container').empty().append(view);
    
        }
      );     
    });
}

Array.prototype.first = function () {
    return this[0];
};

learnjs.newFeedViewWrap = function(response) {
    
    var shopIds = learnjs.beerShops.map(function(obj) {
       return obj.id;
    });

    var feeds = [];

    $.each(learnjs.beerShops, function(i, beerShop){
        // 各店舗情報取得
        var responseShop = response[beerShop.id].data.first();
        console.log(responseShop);

        

        responseShop = {
            message : responseShop.message,
            photos : responseShop.attachments.data.filter(function(obj){
                return obj.hasOwnProperty('media') 
           }).first()
        }
        console.log(responseShop);
        // // messageキーがあるデータのみにする
        // shop = shop.data.filter(function(obj){
        //     return obj.hasOwnProperty('message');
        // });

        // var first = shop.first();
        feeds.push(learnjs.feedtoapp(responseShop, beerShop));
    });

    // 日付新しい順にソート
    feeds = feeds.sort(function(a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    console.log(feeds);

    // render
    var beerShopsView = learnjs.template('beer-shops-view');
    $.each(feeds, function(i, feed){
        var shopView = learnjs.template('beer-shop-view');
        shopView.find('a').filter('.fbUrl').attr('href', feed.fbUrl);
        // 写真追加
        var imageView =  shopView.find('img').find('.image');

        console.log(feed);
        if(feed.hasOwnProperty('photos')){
            $.each(feed.photos, function(j, photo) {
                imageView.attr('src', feed.photo);
                shopView.append(imageView);
            });
        }

        learnjs.applyObject(feed, shopView);
        beerShopsView.append(shopView);
    });
    return beerShopsView;
}

learnjs.feedtoapp = function(responseShop,shop) {
    var obj = new Object();
    obj.name = shop.name;
    obj.message =  responseShop.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
    obj.createdAt = responseShop.created_time;
    obj.fbUrl = "https://www.facebook.com/" + shop.id;
    if(responseShop.hasOwnProperty('photos')) {
        obj.photos = responseShop.photos;
    }
    
    return obj;
}

learnjs.newFeedView = function() {
    var beerShopsView = learnjs.template('beer-shops-view');

    $.each(learnjs.beerShops, function(i, beerShopData){
        var shopView = learnjs.template('beer-shop-view');
        learnjs.applyObject(beerShopData, shopView);
        beerShopsView.append(shopView);
    });
    
    return beerShopsView

}

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