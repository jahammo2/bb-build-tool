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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./GEAT-69/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./GEAT-69/index.js":
/*!**************************!*\
  !*** ./GEAT-69/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  // GLOBAL VARIABLES AND CACHED ELEMENTS
  var jQuery;
  var $navList; // TOP LEVEL TESTING FNS

  var runPoll = function runPoll(pollCondition, offer) {
    var maxAttempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;

    if (!maxAttempts) {
      return;
    }

    if (!pollCondition()) {
      maxAttempts -= 1; // eslint-disable-line no-param-reassign

      return setTimeout(runPoll, 100, pollCondition, offer, maxAttempts); // eslint-disable-line consistent-return, max-len
    }

    offer();
  };

  var pollCondition = function pollCondition() {
    jQuery = window.jQuery;

    if (jQuery) {
      $navList = jQuery('.nav-list.nav-list--categories');
      return Boolean($navList.length);
    }

    return false;
  }; // /////////////////////////
  // TEST SPECIFIC JAVASCRIPT
  // /////////////////////////


  var getMerchCategoryData = function getMerchCategoryData(categoryName) {
    var siteUrl = window.UA.CONFIG.base_url + window.UA.REQUEST.runtime.locale_segment;

    switch (categoryName) {
      case 'Men':
        return {
          dataDtmKey: 'Men|Spotlight-GEAT-236|UA Rush',
          heading: 'UA RUSH™',
          imageSrc: 'https://underarmour.scene7.com/is/image/Underarmour/FW19_TopNav_MensTee_Rush?fmt=jpg&wid=300',
          shopUrl: siteUrl + '/mens/rush-infrared-technology-athletic-apparel/g/3943t'
        };

      case 'Women':
        return {
          dataDtmKey: 'Women|Spotlight-GEAT-236|UA ColdGear',
          heading: 'UA ColdGear®',
          imageSrc: 'https://underarmour.scene7.com/is/image/Underarmour/FW19_TopNav_WomensCG_CGReinvent?fmt=jpg&wid=300',
          shopUrl: siteUrl + '/womens/cold-gear/g/3c11q'
        };

      case 'Boys':
        return {
          dataDtmKey: 'Boys|Spotlight-GEAT-236|UA Hoodies',
          heading: 'UA Hoodies',
          imageSrc: 'https://underarmour.scene7.com/is/image/Underarmour/FW19_TopNav_BoysArmourFleece?fmt=jpg&wid=300',
          shopUrl: siteUrl + '/boys/hoodies/g/3f11'
        };

      case 'Girls':
        return {
          dataDtmKey: 'Girls|Spotlight-GEAT-236|UA Hoodies',
          heading: 'UA Hoodies',
          imageSrc: 'https://underarmour.scene7.com/is/image/Underarmour/FW19_TopNav_GirlsHoodie_SS20Youth?fmt=jpg&wid=300',
          shopUrl: siteUrl + '/girls/hoodies/g/3i11'
        };

      case 'Shoes':
        return {
          dataDtmKey: 'Shoes|Spotlight-GEAT-236|UA TriBase Reign 2',
          heading: 'UA TriBase™ Reign 2',
          imageSrc: 'https://underarmour.scene7.com/is/image/Underarmour/FW19_TopNav_Tribase?fmt=jpg&wid=300',
          shopUrl: siteUrl + '/training/g/3i4'
        };

      default:
        return console.error("the category ".concat(categoryName, " was not found"));
      // eslint-disable-line no-console
    }
  };

  var getNewColumnHTML = function getNewColumnHTML(_ref) {
    var dataDtmKey = _ref.dataDtmKey,
        heading = _ref.heading,
        imageSrc = _ref.imageSrc,
        shopUrl = _ref.shopUrl;
    return "\n      <div class=\"nav-column default GEAT-236-nav-column\">\n        <a\n          data-dtm-key=\"".concat(dataDtmKey, "\"\n          href=").concat(shopUrl, "\n        >\n          <img\n            alt=\"UA Product Image\"\n            class=\"GEAT-236-hero-image\"\n            src=").concat(imageSrc, "\n          />\n        </a>\n\n        <div class=\"GEAT-236-top-heading\">\n          ").concat(heading, "\n        </div>\n\n        <a\n          class=\"GEAT-236-shop-link\"\n          data-dtm-key=\"").concat(dataDtmKey, "\"\n          href=").concat(shopUrl, "\n        >\n          Shop Collection\n        </a>\n      </div>\n    ");
  };

  var getNewContainerHTML = function getNewContainerHTML(_ref2) {
    var dataDtmKey = _ref2.dataDtmKey,
        heading = _ref2.heading,
        imageSrc = _ref2.imageSrc,
        shopUrl = _ref2.shopUrl;
    return "\n      <div class=\"nav-column spotlight GEAT-236-spotlight-container\">\n        <a\n          data-dtm-key=\"".concat(dataDtmKey, "\"\n          href=").concat(shopUrl, "\n        >\n          <img\n            alt=\"UA Product Image\"\n            class=\"GEAT-236-hero-image\"\n            src=").concat(imageSrc, "\n          />\n        </a>\n\n        <div class=\"GEAT-236-top-heading\">\n          ").concat(heading, "\n        </div>\n\n        <a\n          class=\"GEAT-236-shop-link\"\n          data-dtm-key=\"").concat(dataDtmKey, "\"\n          href=").concat(shopUrl, "\n        >\n          Shop Collection\n        </a>\n      </div>\n    ");
  };

  var handleCategory = function handleCategory(category, isOnTablet) {
    var $menu = jQuery(category).children('.ua-top-nav-menu');
    var categoryName = $menu.children('.ua-top-nav-item--mobile').data('dtm-key');
    if (categoryName === 'Outlet') return;
    if (categoryName === 'Gift Guide') return;
    var container = $menu.children('.ua-top-nav-column-container');
    var data = getMerchCategoryData(categoryName);
    var html;

    if (isOnTablet) {
      html = getNewContainerHTML(data);
      container.addClass('spotlight-container');
    } else {
      html = getNewColumnHTML(data);
    }

    container.prepend(html);
  }; // From John for hover tracking


  var attachHoverMutationObserver = function attachHoverMutationObserver() {
    var targetNode = document.querySelector('.nav-list.nav-list--categories');
    var config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    var callback = function callback(mutationsList, observer) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var mutation = _step.value;
          var isHover = Array.from(mutation.target.classList).indexOf('active-hover') > -1;

          if (isHover) {
            s.clearVars();
            s.tl(true, 'o', 'navHover_GEAT-236');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  };

  var offer = function offer() {
    jQuery(styles).appendTo('head');
    var categories = $navList.children('.ua-top-nav-category').not('.hide-desktop');
    var isOnTablet = window.screen.width >= 768 && window.screen.width < 991;
    var isOnDesktop = window.screen.width >= 991;
    if (!isOnTablet && !isOnDesktop) return;
    categories.each(function (index, category) {
      return handleCategory(category, isOnTablet);
    });
  };

  runPoll(pollCondition, offer, 50);
  attachHoverMutationObserver();
})();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map