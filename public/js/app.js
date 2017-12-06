/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.learnjs = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WhatsNew = __webpack_require__(1);

var _WhatsNew2 = _interopRequireDefault(_WhatsNew);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CraftBeerLoves = function () {
    function CraftBeerLoves() {
        _classCallCheck(this, CraftBeerLoves);

        this.appOnReady();
    }

    _createClass(CraftBeerLoves, [{
        key: 'appOnReady',
        value: function appOnReady() {
            var _this = this;

            window.addEventListener('hashchange', function () {
                return _this.showView(window.location.hash);
            });
            this.showView(window.location.hash);
        }
    }, {
        key: 'showView',
        value: function showView(hash) {
            var routes = {
                '#problem': learnjs.problemView,
                '#googleads': learnjs.newFeedViewWithProgress,
                '#': learnjs.newFeedViewWithProgress,
                '': learnjs.newFeedViewWithProgress
            };
            var hashParts = hash.split('-');
            var viewFn = routes[hashParts[0]]; // #problem -> learnjs.problemView
            if (viewFn) {
                learnjs.triggerEvent('removingView', []);
                $('.view-container').empty().append(viewFn(hashParts[1]));
            }
        }
    }]);

    return CraftBeerLoves;
}();

exports.default = CraftBeerLoves;
var learnjs = exports.learnjs = {};

window.addEventListener('load', function () {
    return new CraftBeerLoves("hello");
});

learnjs.problems = [{
    description: "What is truth?",
    code: "function problem() { return __; }"
}, {
    description: "Simple Math",
    code: "function problem() { return 42 === 6 * __; }"
}];

learnjs.appOnReady = function () {
    window.onhashchange = function () {
        learnjs.showView(window.location.hash);
    };
    learnjs.showView(window.location.hash);
};

learnjs.showView = function (hash) {
    var routes = {
        '#problem': learnjs.problemView,
        '#googleads': learnjs.newFeedViewWithProgress,
        '#': learnjs.newFeedViewWithProgress,
        '': learnjs.newFeedViewWithProgress
    };
    var hashParts = hash.split('-');
    var viewFn = routes[hashParts[0]]; // #problem -> learnjs.problemView
    if (viewFn) {
        learnjs.triggerEvent('removingView', []);
        $('.view-container').empty().append(viewFn(hashParts[1]));
    }
};

Array.prototype.first = function () {
    return this[0];
};

learnjs.newFeedViewWithProgress = function () {
    var whatsNew = new _WhatsNew2.default();
    whatsNew.fetchWhatsNew(function (view) {
        learnjs.render(view);
        learnjs.readContinue(view);
    });
};

learnjs.render = function (view) {
    learnjs.triggerEvent('removingView', []);
    $('.view-container').empty().append(view);
};

learnjs.whatsNewView = function (whatsNews) {
    var beerShopsView = learnjs.template('beer-shops-view');

    $.each(whatsNews, function (i, whatsNew) {
        var shopView = learnjs.template('beer-shop-view');
        if (whatsNew.message) {
            var messageWithNewlineAndSpace = whatsNew.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
            whatsNew.message = learnjs.AutoLink(messageWithNewlineAndSpace);
        }

        whatsNew.createdAt = learnjs.toLocaleDateString(whatsNew.createdAt);
        console.log(whatsNew);
        shopView.find('a').filter('.fbUrl').attr('href', whatsNew.fbUrl);

        if (whatsNew.photos.length > 0) {
            shopView.find('.scaledImage').attr('src', whatsNew.photos[0].src);
        }
        learnjs.applyObject(whatsNew, shopView);
        beerShopsView.append(shopView);
    });
    return beerShopsView;
};

learnjs.toLocaleDateString = function (date) {
    var ms = learnjs.parseDate(date);
    return new Date(ms).toLocaleString();
};

/**-------------------------
 * 続きをよむセットアップ
 -------------------------*/
var itemHeights = [];
learnjs.readContinue = function (beerShopsView) {
    learnjs.hideMessage(beerShopsView);
    learnjs.onClickReadContinueButton(beerShopsView);
};
learnjs.hideMessage = function (beerShopsView) {
    beerShopsView.find('.beer-shop-view').each(function () {

        var gradWrapView = $(this).find('.grad-wrap');

        var originalHeight = gradWrapView.height();
        if (originalHeight < 250) {
            // 「続きをよむ」は表示しない
            gradWrapView.find('.grad-trigger').hide();
        } else {
            gradWrapView.find('.grad-item').addClass('is-hide');
        }
        var shortHeight = gradWrapView.height();
        itemHeights.push({ original: originalHeight, short: shortHeight });
    });
};

learnjs.onClickReadContinueButton = function (beerShopsView) {
    beerShopsView.find('.grad-trigger').on('click', function () {
        var index = $(this).index('.grad-trigger');
        var height = itemHeights[index];
        if (!$(this).hasClass('is-show')) {
            $(this).addClass('is-show').next().animate({ height: height.original }, 200).removeClass('is-hide');
            return;
        }
        $(this).removeClass('is-show').next().animate({ height: height.short }, 200).addClass('is-hide');
    });
};

/**
 * ランディングページViewを取得
 */
learnjs.landingView = function () {
    return learnjs.template('landing-view');
};

learnjs.problemView = function (data) {

    var problemNumber = parseInt(data, 10);
    var view = learnjs.template('problem-view');
    var title = 'Problem #' + problemNumber;
    var resultFlash = view.find('.result');
    var problemData = learnjs.problems[problemNumber - 1];

    function checkAnswer() {
        var answer = view.find('.answer').val();
        var test = problemData.code.replace('__', answer) + '; problem();';
        return eval(test);
    }

    function checkAnswerClick() {
        if (checkAnswer()) {
            learnjs.flashElement(resultFlash, learnjs.buildCorrectFlash(problemNumber));
            return false;
        }
        learnjs.flashElement(resultFlash, 'Incorrect!');
        return false;
    }

    if (problemNumber < learnjs.problems.length) {
        var buttonItem = learnjs.template('skip-btn');
        buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
        $('.nav-list').append(buttonItem);
        view.bind('removingView', function () {
            buttonItem.remove();
        });
    }

    view.find('.check-btn').click(checkAnswerClick);
    view.find('.title').text(title);
    learnjs.applyObject(problemData, view);
    return view;
};

// bind data
learnjs.applyObject = function (obj, elem) {
    for (var key in obj) {
        elem.find('[data-name="' + key + '"]').html(obj[key]);
    }
};

learnjs.flashElement = function (elem, content) {
    elem.fadeOut('fast', function () {
        elem.html(content);
        elem.fadeIn();
    });
};

// templateからコピー
learnjs.template = function (name) {
    return $('.templates .' + name).clone();
};

learnjs.buildCorrectFlash = function (problemNumber) {
    var correctFlash = learnjs.template('correct-flash');
    var link = correctFlash.find('a');
    if (problemNumber < learnjs.problems.length) {
        link.attr('href', '#problem-' + (problemNumber + 1));
        return correctFlash;
    }
    link.attr('href', '');
    link.text("You're Finished!");
    return correctFlash;
};

learnjs.triggerEvent = function (name, args) {
    $('.view-container>*').trigger(name, args);
};

// Utils

// ChromeとSafariでDateの扱いが異なる
// https://stackoverflow.com/a/42151174
learnjs.parseDate = function (date) {
    var parsed = Date.parse(date);
    if (!isNaN(parsed)) {
        return parsed;
    }
    return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
};

/**
 * String内にあるURLにaタグを付けた文字列を返す。
 * target="_blank"付 // TODO: 引数か何かで切り替えれるといいかも
 * @param {*} str 
 */
learnjs.AutoLink = function (str) {
    var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
    var regexp_makeLink = function regexp_makeLink(all, url, h, href) {
        return '<a target="_blank" href="h' + href + '">' + url + '</a>';
    };
    return str.replace(regexp_url, regexp_makeLink);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CommonView = __webpack_require__(2);

var _CommonView2 = _interopRequireDefault(_CommonView);

var _DateUtils = __webpack_require__(3);

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _HtmlUtils = __webpack_require__(4);

var _HtmlUtils2 = _interopRequireDefault(_HtmlUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// private instance
var commonView = Symbol();

var WhatsNew = function () {
    function WhatsNew() {
        _classCallCheck(this, WhatsNew);

        this[commonView] = new _CommonView2.default();
    }

    _createClass(WhatsNew, [{
        key: "fetchWhatsNew",
        value: async function fetchWhatsNew(callback) {
            var url = 'https://epfb5um7ae.execute-api.us-east-1.amazonaws.com/staging/whats-new';
            try {

                this[commonView].showProgress();
                var response = await fetch(url);
                // console.log(await response.json());
                var json = await response.json();
                this[commonView].hideProgress();

                var whatsNewView = this.whatsNewView(json.result);
                callback(whatsNewView);
            } catch (error) {
                this[commonView].hideProgress();
                console.log(error);
            }
        }
    }, {
        key: "whatsNewView",
        value: function whatsNewView(whatsNews) {
            var _this = this;

            var beerShopsView = this[commonView].template('beer-shops-view');

            $.each(whatsNews, function (i, whatsNew) {
                var shopView = _this[commonView].template('beer-shop-view');
                if (whatsNew.message) {
                    var messageWithNewlineAndSpace = whatsNew.message.replace(/\r?\n/g, "<br>").replace(/\s/g, "&nbsp;");
                    whatsNew.message = _HtmlUtils2.default.applyAnchorLink(messageWithNewlineAndSpace);
                }

                whatsNew.createdAt = _DateUtils2.default.toLocaleDateString(whatsNew.createdAt);
                console.log(whatsNew);
                shopView.find('a').filter('.fbUrl').attr('href', whatsNew.fbUrl);

                if (whatsNew.photos.length > 0) {
                    shopView.find('.scaledImage').attr('src', whatsNew.photos[0].src);
                }
                _this[commonView].applyObject(whatsNew, shopView);
                beerShopsView.append(shopView);
            });
            return beerShopsView;
        }
    }]);

    return WhatsNew;
}();

exports.default = WhatsNew;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CommonView = function () {
    function CommonView() {
        _classCallCheck(this, CommonView);
    }
    // no-op


    // bind data


    _createClass(CommonView, [{
        key: 'applyObject',
        value: function applyObject(obj, elem) {
            for (var key in obj) {
                elem.find('[data-name="' + key + '"]').html(obj[key]);
            }
        }

        // templateからコピー

    }, {
        key: 'template',
        value: function template(name) {
            return $('.templates .' + name).clone();
        }
    }, {
        key: 'showProgress',
        value: function showProgress() {
            this.hideSideBar();
            $('#progress').show();
        }
    }, {
        key: 'hideProgress',
        value: function hideProgress() {
            $('#progress').hide();
            this.showSideBar();
        }
    }, {
        key: 'showSideBar',
        value: function showSideBar() {
            $('#sidebar-container').show();
        }
    }, {
        key: 'hideSideBar',
        value: function hideSideBar() {
            $('#sidebar-container').hide();
        }
    }]);

    return CommonView;
}();

exports.default = CommonView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateUtils = function () {
    function DateUtils() {
        _classCallCheck(this, DateUtils);
    }

    // ChromeとSafariでDateの扱いが異なる
    // https://stackoverflow.com/a/42151174

    _createClass(DateUtils, null, [{
        key: 'parseDate',
        value: function parseDate(date) {
            var parsed = Date.parse(date);
            if (!isNaN(parsed)) {
                return parsed;
            }
            return Date.parse(date.replace(/-/g, '/').replace(/[a-z]+/gi, ' '));
        }
    }, {
        key: 'toLocaleDateString',
        value: function toLocaleDateString(date) {
            var ms = DateUtils.parseDate(date);
            return new Date(ms).toLocaleString();
        }
    }]);

    return DateUtils;
}();

exports.default = DateUtils;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlUtils = function () {
    function HtmlUtils() {
        _classCallCheck(this, HtmlUtils);
    }

    /**
     * String内にあるURLにaタグを付けた文字列を返す。
     * target="_blank"付 // TODO: 引数か何かで切り替えれるといいかも
     * @param {*} str 
     */


    _createClass(HtmlUtils, null, [{
        key: 'applyAnchorLink',
        value: function applyAnchorLink(str) {
            var regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
            var regexp_makeLink = function regexp_makeLink(all, url, h, href) {
                return '<a target="_blank" href="h' + href + '">' + url + '</a>';
            };
            return str.replace(regexp_url, regexp_makeLink);
        }
    }]);

    return HtmlUtils;
}();

exports.default = HtmlUtils;

/***/ })
/******/ ]);