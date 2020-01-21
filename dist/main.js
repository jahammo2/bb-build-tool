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
/******/ 	return __webpack_require__(__webpack_require__.s = "./GEAT-216/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./GEAT-216/index.js":
/*!***************************!*\
  !*** ./GEAT-216/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function () {
  // GLOBAL VARIABLES AND CACHED ELEMENTS
  var $contentWrapper;
  var $iFrameBranchBanner;
  var buyPanelAddToCart;
  var buyPanelSizeList;
  var buyPanelSizeListClone;
  var geatButtonsContainer;
  var geatContentContainer;
  var geatSizeTitlePriceContainer;
  var geatStickyContainer;
  var geatTopNavWrapper;
  var giftButton;
  var newSizeTitlePriceContainerHeight;
  var originalCheckoutButton;
  var originalPaypalButton;
  var pdpContainer;
  var areSizesShowing = false;
  var buttonPosition;
  var currentlySelectedItemSize;
  var isOnDesktop = false;
  var isOnMobile = false;
  var isOnTablet = false;
  var isStickyContainerOpen = true;
  var jQuery;
  var screenWidth; // //////////////////////
  // TOP LEVEL TESTING FNS
  // //////////////////////

  var runPoll = function runPoll(pollCondition, offer) {
    var maxAttempts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;

    if (!maxAttempts) {
      return;
    }

    if (!pollCondition()) {
      maxAttempts -= 1; // eslint-disable-line no-param-reassign

      return setTimeout(runPoll, 1000, pollCondition, offer, maxAttempts); // eslint-disable-line consistent-return, max-len
    }

    offer();
  };

  var pollCondition = function pollCondition() {
    jQuery = window.jQuery;

    if (jQuery) {
      $contentWrapper = jQuery('.content-wrapper');
      pdpContainer = $contentWrapper.find('.pdp-container');
      originalCheckoutButton = pdpContainer.find('.pdp-cta-btn');
      originalPaypalButton = pdpContainer.find('.pdp-paypal-checkout-button');
      buyPanelSizeList = $contentWrapper.find('#sizeChipList');
      return Boolean(originalCheckoutButton.length) && Boolean(originalPaypalButton.length) && Boolean(buyPanelSizeList.length);
    }

    return false;
  }; // /////////////////////////
  // TEST-SPECIFIC JAVASCRIPT
  // /////////////////////////
  // //////////////
  // Used by all
  // //////////////


  function handleCloseClick() {
    areSizesShowing = false;
    if (isOnMobile) closeSizeListOnMobile();
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--closed');
    return closeSizesTitlePrice();
  }

  function handleCTAButtonClick() {
    if (!currentlySelectedItemSize) handleSizeValidations();
  }

  function handleCTAs() {
    originalCheckoutButton.click(handleCTAButtonClick);
    originalPaypalButton.click(handleCTAButtonClick);
  }

  function handleGiftCardPage() {
    if (window.location.href.indexOf('under-armour-gift-card') < 0) return null;
    return geatSizeTitlePriceContainer.children('.GEAT-216-size-error').text('Please select an amount');
  }

  function handleSizeValidations() {
    if (areSizesShowing) {
      geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight + 20);
      buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--error-active');
      return geatSizeTitlePriceContainer.children('.GEAT-216-size-error').addClass('GEAT-216-size-error--active');
    }

    if (isOnMobile) {
      openSizeListOnMobile();
    } else {
      openSizeListOnDesktop();
    }

    areSizesShowing = true;
    openSizesTitlePrice();
    geatTopNavWrapper.click(handleCloseClick);
    return geatStickyContainer.find('.GEAT-216-close-link').click(handleCloseClick);
  }

  function closeSizesTitlePrice() {
    return geatSizeTitlePriceContainer.addClass('GEAT-216-content-container__size-title-price--closed');
  }

  function openSizesTitlePrice() {
    return geatSizeTitlePriceContainer.removeClass('GEAT-216-content-container__size-title-price--closed');
  }

  function prepareItemSize(size) {
    var $item = jQuery(size);
    if ($item.hasClass('selected')) currentlySelectedItemSize = $item;
    return $item;
  }

  function sizeListSizesCallback(_, size) {
    var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
    var $item = prepareItemSize(size);
    $item.click(function () {
      currentlySelectedItemSize = $item;
      callback($item);
      var sizeError = geatSizeTitlePriceContainer.children('.GEAT-216-size-error');

      if (sizeError) {
        geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight);
        sizeError.removeClass('GEAT-216-size-error--active');
        buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--error-active');
      }
    });
  }

  function setUpBuyPanelSizeList(callback) {
    buyPanelSizeList.children().each(callback || sizeListSizesCallback);
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist');
  }

  function setSizeTitlePriceContainerHeight() {
    var extra = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var sizeListHeight = buyPanelSizeList.height(); // sizeListHeight + margins around size list + aeshetic spacing

    newSizeTitlePriceContainerHeight = sizeListHeight + 30 + extra;
    geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight);
  } // //////////////
  // Desktop only
  // //////////////
  // Events


  function closeStickyContainerOnDesktop() {
    // If it's not open, there's no need to do a DOM manipulation.
    if (!isStickyContainerOpen) return;
    isStickyContainerOpen = false;
    buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--sticky-open');
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--closed');
    geatStickyContainer.addClass('GEAT-216-sticky-container--closed');
    handleCloseClick();
    toggleCTALocationsOnDesktop();
  }

  function openStickyContainerOnDesktop() {
    if (isStickyContainerOpen) return;
    isStickyContainerOpen = true;
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--sticky-open');
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--closed');
    geatStickyContainer.removeClass('GEAT-216-sticky-container--closed');
    toggleCTALocationsOnDesktop();
  }

  function openSizeListOnDesktop() {
    return buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--closed');
  }

  function setUpTitlesAndPricesOnDesktop(productPrice, productTitle) {
    geatSizeTitlePriceContainer = geatStickyContainer.children('.GEAT-216-content-container__size-title-price');
    geatContentContainer.children('.GEAT-216-title-price-heading-container').prepend(productTitle).append(productPrice);
  }

  function handleScrollOnDesktop() {
    var $scrollPosition = jQuery(window).scrollTop(); // To handle odd scroll behavior on tablets

    if (isOnTablet) {
      $scrollPosition += 60;
      var diff = $scrollPosition - buttonPosition;
      if (diff >= 60) return openStickyContainerOnDesktop();
      if (diff >= 0 && diff < 60) return null;
      return closeStickyContainerOnDesktop();
    }

    if ($scrollPosition >= buttonPosition) return openStickyContainerOnDesktop();
    return closeStickyContainerOnDesktop();
  }

  function toggleCTALocationsOnDesktop() {
    if (pdpContainer.hasClass('GEAT-216-pdp-container--sticky-open')) {
      pdpContainer.find('.GEAT-216-div-cta-placeholder').remove();
      return pdpContainer.removeClass('GEAT-216-pdp-container--sticky-open');
    }

    var height = geatSizeTitlePriceContainer.height() + 50;
    if (isOnTablet) height = 66; // To keep the sibling elements from jumping up "spaces" and
    // creating a harsh transition

    originalCheckoutButton.after("\n        <div\n          class=\"GEAT-216-div-cta-placeholder\"\n          style=\"height: ".concat(height, "px\"\n        />\n      ")).after('<div class="GEAT-216-div-cta-placeholder" />');
    return pdpContainer.addClass('GEAT-216-pdp-container--sticky-open');
  }

  function addStickyContainerOnDesktop() {
    buyPanelAddToCart = $contentWrapper.find('.buypanel_addtocart');
    buyPanelAddToCart.append(stickyContainerHtmlOnDesktop);
    geatStickyContainer = buyPanelAddToCart.children('.GEAT-216-sticky-container');
    giftButton = buyPanelAddToCart.find('.pdp-smart-gift-button');
    giftButton.addClass('GEAT-216-smart-gift-button');
  }

  function moveSizesOnDesktop() {
    setUpBuyPanelSizeList(); // 18 extra pixels for aesthetics

    setSizeTitlePriceContainerHeight(18);
  } // //////////////
  // Mobile only
  // //////////////


  function updateElementsInBuyPanelOnMobile() {
    var addToCartQuantity = buyPanelAddToCart.find('.addtocart-quantity');
    var uaTopNavWrapper = $contentWrapper.find('#ua-top-nav-wrapper');
    giftButton = buyPanelAddToCart.children('.pdp-smart-gift-button'); // screen width - width of quantity dropdown - margins (gutter left + between buttons + gutter right)

    var width = screenWidth - 100 - 49;
    var top = addToCartQuantity.offset().top - uaTopNavWrapper.height() - 76;
    if ($iFrameBranchBanner.length > 0) top -= 80;
    giftButton.addClass('GEAT-216-smart-gift-button');
    giftButton.css('width', width);
    giftButton.css('top', top);
  }

  function buyPanelSizeListClonedSizeCallbackOnMobile(_, size) {
    var $item = prepareItemSize(size);
    $item.removeAttr('data-reactid');
    $item.click(function () {
      currentlySelectedItemSize = $item;
    });
  }

  function moveSizesOnMobile() {
    buyPanelSizeListClone = buyPanelSizeList.clone();
    var parent = buyPanelSizeList.parent();

    var callback = function callback($item) {
      var id = $item.attr('id');
      var listItem = buyPanelSizeListClone.find("#".concat(id));
      listItem.addClass('selected');
    };

    setUpBuyPanelSizeList(function (_, size) {
      return sizeListSizesCallback(_, size, callback);
    }); // Because of how the VirtualDOM works in React, if an identical element
    // is added to DOM, errors will be thrown. By removing the data-reactid,
    // the VirtualDOM doesn't get upset about an identical child being present

    buyPanelSizeListClone.removeAttr('data-reactid');
    buyPanelSizeListClone.addClass('GEAT-216-buypanel-sizelist-clone');
    buyPanelSizeListClone.children().each(buyPanelSizeListClonedSizeCallbackOnMobile); // closeSizeListOnMobile();

    parent.append(buyPanelSizeListClone); // 28 extra pixels for aesthetics

    var extra = geatSizeTitlePriceContainer.height() + 28;
    setSizeTitlePriceContainerHeight(extra);
  }

  function closeSizeListOnMobile() {
    geatButtonsContainer.removeClass('GEAT-216-content-container__buttons--overlay-open');
    geatTopNavWrapper.removeClass('GEAT-216-top-nav-container--overlay-open');
    var darkBackground = geatStickyContainer.children('.GEAT-216-dark-background');
    if (darkBackground.length > 0) darkBackground.remove();
    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--sticky-closing');
    return setTimeout(function () {
      buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--sticky-open');
      buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--sticky-closing');
      buyPanelSizeListClone.addClass('GEAT-216-buypanel-sizelist-clone');
    }, 600);
  }

  function openSizeListOnMobile() {
    geatButtonsContainer.addClass('GEAT-216-content-container__buttons--overlay-open');
    geatTopNavWrapper.addClass('GEAT-216-top-nav-container--overlay-open');
    geatStickyContainer.prepend('<div class="GEAT-216-dark-background" />'); // Setting height via JS because without knowing the scroll height, we
    // will get the dark background ending too early (if you're closer to
    // the bottom of the page) or ending too late, thus increasing the scrollable
    // area of the whole screen.

    geatStickyContainer.children('.GEAT-216-dark-background') // Extra 200 for a lil wiggle room
    .css('height', document.body.scrollHeight + 200).click(handleCloseClick);
    buyPanelSizeListClone.addClass('GEAT-216-buypanel-sizelist-clone--sticky-opening');
    return setTimeout(function () {
      buyPanelSizeListClone.removeClass('GEAT-216-buypanel-sizelist-clone');
      buyPanelSizeListClone.removeClass('GEAT-216-buypanel-sizelist-clone--sticky-opening');
      buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--sticky-open');
    }, 600);
  }

  function setUpTitlesAndPricesOnMobile(productPrice, productTitle) {
    geatSizeTitlePriceContainer = geatContentContainer.children('.GEAT-216-content-container__size-title-price');
    geatSizeTitlePriceContainer.children('.GEAT-216-title-price-heading-container').prepend(productTitle).append(productPrice);
  }

  function addSpecificBottomStyleOnMobile() {
    // container height + padding - button container height + extra for a lil cleaner transition
    var bottom = (geatSizeTitlePriceContainer.height() + 24 - 81 + 80) * -1; // Adding styles this way because without knowing the container height, the transition
    // may be too far down or not far enough and will thus create an awkward looking
    // transition.

    var bottomStyle = "\n      <style type='text/css'>\n        .GEAT-216-content-container__size-title-price--closed {\n          bottom: ".concat(bottom, "px;\n        }\n\n        .GEAT-216-buypanel-sizelist--sticky-closing,\n        .GEAT-216-buypanel-sizelist-clone {\n          bottom: ").concat(bottom, "px;\n        }\n      </style>\n    ");
    jQuery(bottomStyle).appendTo('body');
  }

  function addStickyContainerOnMobile() {
    buyPanelAddToCart = $contentWrapper.find('.buypanel_addtocart');
    buyPanelAddToCart.prepend(stickyContainerHtmlOnMobile);
    geatStickyContainer = buyPanelAddToCart.children('.GEAT-216-sticky-container');
    updateElementsInBuyPanelOnMobile();
  }

  function handleGoToAppIFrameAppearingOnMobile() {
    if ($iFrameBranchBanner.length > 0) {
      $iFrameBranchBanner.contents().find('.branch-banner-close').click(function () {
        var currentTop = giftButton.css('top');
        giftButton.css('top', currentTop + 80);
      });
    }
  } // //////////////
  // Tablet only
  // //////////////


  function handleGoToAppIFrameAppearingOnTablet() {
    if ($iFrameBranchBanner.length > 0) {
      geatStickyContainer.addClass('GEAT-216-sticky-container--iframe-open');
      pdpContainer.addClass('GEAT-216-pdp-container--iframe-open');
      buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--iframe-open');
      $iFrameBranchBanner.contents().find('.branch-banner-close').click(function () {
        geatStickyContainer.removeClass('GEAT-216-sticky-container--iframe-open');
        pdpContainer.removeClass('GEAT-216-pdp-container--iframe-open');
        buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--iframe-open');
      });
    }
  } // //////////////
  // Base Functionality
  // //////////////
  // HTMLs


  var closeButtonHtml = "\n    <div class=\"GEAT-216-close-link-container\">\n      <div class=\"GEAT-216-close-link\">\n        <span class=\"nav-list-mobile-icon GEAT-216-close-link__x\" />\n        <h4 class=\"GEAT-216-close-link__title\"> Close</h4>\n      </div>\n    </div>\n  ";
  var sizeErrorHtml = "\n    <div class=\"GEAT-216-size-error\">\n      Please select size\n    </div>\n  ";
  var stickyContainerHtmlOnMobile = "\n    <div class=\"pdp-redesign GEAT-216-sticky-container\">\n      <div class=\"GEAT-216-content-container\">\n        <div class=\"GEAT-216-content-container__size-title-price GEAT-216-content-container__size-title-price--closed\">\n          <div class=\"GEAT-216-title-price-heading-container\" />\n          ".concat(sizeErrorHtml, "\n          ").concat(closeButtonHtml, "\n        </div>\n\n        <div class=\"GEAT-216-content-container__buttons\" />\n      </div>\n    </div>\n  ");
  var stickyContainerHtmlOnDesktop = "\n    <div class=\"pdp-redesign GEAT-216-sticky-container GEAT-216-sticky-container--closed\">\n      <div class=\"GEAT-216-content-container\">\n        <div class=\"GEAT-216-title-price-heading-container\" />\n        <div class=\"GEAT-216-content-container__buttons\" />\n      </div>\n\n      <div class=\"GEAT-216-content-container__size-title-price GEAT-216-content-container__size-title-price--closed\">\n        ".concat(sizeErrorHtml, "\n        ").concat(closeButtonHtml, "\n      </div>\n    </div>\n  "); // Events

  function setUpTitlesAndPrices() {
    var buyPanelElements = pdpContainer.find('.buypanel');
    var productPrice = buyPanelElements.find('.buypanel_productprice');
    var productTitle = buyPanelElements.find('.buypanel_producttitle');
    productPrice.addClass('GEAT-216-product-price');
    productTitle.addClass('GEAT-216-product-title');
    productTitle.children('.buypanel_cattitle').remove();
    if (isOnMobile) return setUpTitlesAndPricesOnMobile(productPrice, productTitle);
    return setUpTitlesAndPricesOnDesktop(productPrice, productTitle);
  }

  function addStickyContainer() {
    if (!isOnDesktop) $iFrameBranchBanner = jQuery('#branch-banner-iframe');
    geatTopNavWrapper = $contentWrapper.find('.top-nav-container');
    geatTopNavWrapper.addClass('GEAT-216-top-nav-container');

    if (isOnMobile) {
      addStickyContainerOnMobile();
    } else {
      addStickyContainerOnDesktop();
    }

    geatContentContainer = geatStickyContainer.children('.GEAT-216-content-container');
    geatButtonsContainer = geatContentContainer.children('.GEAT-216-content-container__buttons');
    setUpTitlesAndPrices();

    if (isOnMobile) {
      moveSizesOnMobile();
      addSpecificBottomStyleOnMobile();
      handleGoToAppIFrameAppearingOnMobile();
    } else {
      moveSizesOnDesktop();
    }

    if (isOnTablet) handleGoToAppIFrameAppearingOnTablet();
    handleGiftCardPage();
  }

  var offer = function offer() {
    jQuery(styles).appendTo('body'); // This class is just to add specificity for styling and to
    // ensure classes elsewhere on UA are not overidden

    pdpContainer.addClass('GEAT-216-pdp-container');

    window.require('process').once('addToCart.complete', function () {
      console.log('checkout complete... add tracking event here');
      handleCloseClick();
    });

    screenWidth = window.screen.width;
    isOnDesktop = screenWidth >= 991;
    isOnMobile = screenWidth <= 767;
    isOnTablet = screenWidth >= 768 && screenWidth <= 990;

    if (!isOnMobile) {
      // button position - message nav size - main nav size + button size
      buttonPosition = originalCheckoutButton.offset().top - 30 - 75 + 50;
      isStickyContainerOpen = false;
      jQuery(window).on('scroll', handleScrollOnDesktop);
    }

    handleCTAs();
    addStickyContainer();
  };

  runPoll(pollCondition, offer, 100);
})();

/***/ })

/******/ });
//# sourceMappingURL=main.js.map