(function () {
  // GLOBAL VARIABLES AND CACHED ELEMENTS
  let $contentWrapper;

  let buyPanelAddToCart;
  let buyPanelSizeList;
  let buyPanelSizeListClone;
  let geatButtonsContainer;
  let geatContentContainer;
  let geatSizeTitlePriceContainer;
  let geatStickyContainer;
  let geatTopNavWrapper;
  let newSizeTitlePriceContainerHeight;
  let originalCheckoutButton;
  let originalPaypalButton;
  let pdpContainer;
  let smartGiftButton;

  let areSizesShowing = false;
  let buttonPosition;
  let currentlySelectedItemSize;
  let isOnMobile = false;
  let isOnTablet = false;
  let isStickyContainerOpen = true;
  let jQuery;
  let screenWidth;

  // //////////////////////
  // TOP LEVEL TESTING FNS
  // //////////////////////

  const runPoll = (pollCondition, offer, maxAttempts = 50) => {
    if (!maxAttempts) {
      return;
    }

    if (!pollCondition()) {
      maxAttempts -= 1; // eslint-disable-line no-param-reassign
      return setTimeout(runPoll, 1000, pollCondition, offer, maxAttempts); // eslint-disable-line consistent-return, max-len
    }

    offer();
  };

  const pollCondition = () => {
    jQuery = window.jQuery;

    if (jQuery) {
      $contentWrapper = jQuery('.content-wrapper');
      pdpContainer = $contentWrapper.find('.pdp-container');
      // This class is just to add specificity for styling and to
      // ensure classes elsewhere on UA are not overidden
      pdpContainer.addClass('GEAT-216-pdp-container');

      originalCheckoutButton = pdpContainer.find('.pdp-cta-btn');
      originalPaypalButton = pdpContainer.find('.pdp-paypal-checkout-button');

      return Boolean(originalCheckoutButton.length)
        && Boolean(originalPaypalButton.length);
    }

    return false;
  };

  // /////////////////////////
  // TEST-SPECIFIC JAVASCRIPT
  // /////////////////////////

  // //////////////
  // Used by all
  // //////////////

  function handleCloseClick() {
    areSizesShowing = false;

    if (isOnMobile) {
      closeSizeListOnMobile();
    }

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

  function handleSizeValidations() {
    if (areSizesShowing) {
      geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight + 20);

      buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--error-active');

      return geatSizeTitlePriceContainer
        .children('.GEAT-216-size-error')
        .addClass('GEAT-216-size-error--active');
    }

    if (isOnMobile) {
      openSizeListOnMobile();
    } else {
      openSizeListOnDesktop();
    }

    openSizesTitlePrice();

    areSizesShowing = true;

    geatTopNavWrapper.click(handleCloseClick);

    return geatStickyContainer
      .find('.GEAT-216-close-link')
      .click(handleCloseClick);
  }

  function closeSizesTitlePrice() {
    return geatSizeTitlePriceContainer
      .addClass('GEAT-216-content-container__size-title-price--closed');
  }

  function openSizesTitlePrice() {
    return geatSizeTitlePriceContainer
      .removeClass('GEAT-216-content-container__size-title-price--closed');
  }

  function prepareItemSize(size) {
    const $item = jQuery(size);

    if ($item.hasClass('selected')) currentlySelectedItemSize = $item;

    return $item;
  }

  function sizeListSizesCallback(_, size, callback = () => {}) {
    const $item = prepareItemSize(size);

    $item.click(() => {
      currentlySelectedItemSize = $item;

      callback($item);

      const sizeError = geatSizeTitlePriceContainer.children('.GEAT-216-size-error');

      if (sizeError) {
        geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight);
        sizeError.removeClass('GEAT-216-size-error--active');
        buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--error-active');
      }
    });
  }

  function setUpBuyPanelSizeList(callback) {
    buyPanelSizeList = $contentWrapper.find('#sizeChipList');

    buyPanelSizeList
      .children()
      .each(callback || sizeListSizesCallback);

    buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist');
  }

  function setSizeTitlePriceContainerHeight(extra = 0) {
    const sizeListHeight = buyPanelSizeList.height();
    // sizeListHeight + margins around size list + aeshetic spacing
    newSizeTitlePriceContainerHeight = sizeListHeight + 30 + extra;
    console.log('sizeListHeight', sizeListHeight, extra, newSizeTitlePriceContainerHeight);

    geatSizeTitlePriceContainer.css('height', newSizeTitlePriceContainerHeight);
  }

  // //////////////
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
    geatSizeTitlePriceContainer = geatStickyContainer
      .children('.GEAT-216-content-container__size-title-price');

    geatContentContainer
      .children('.GEAT-216-title-price-heading-container')
      .prepend(productTitle)
      .append(productPrice);
  }

  function handleScrollOnDesktop() {
    const $scrollPosition = jQuery(window).scrollTop();

    if ($scrollPosition >= buttonPosition) return openStickyContainerOnDesktop();

    return closeStickyContainerOnDesktop();
  }

  function toggleCTALocationsOnDesktop() {
    if (pdpContainer.hasClass('GEAT-216-pdp-container--sticky-open')) {
      // cloneCheckout.remove();
      // clonePaypal.remove();

      buyPanelAddToCart.children('.GEAT-216-div-cta-placeholder').remove();

      return pdpContainer.removeClass('GEAT-216-pdp-container--sticky-open');
    }

    let height = geatSizeTitlePriceContainer.height() + 50;

    if (isOnTablet) height -= 16;

    originalCheckoutButton
      .after(`
        <div
          class="GEAT-216-div-cta-placeholder"
          style="height: ${height}px"
        />
      `)
      .after('<div class="GEAT-216-div-cta-placeholder" />');

    return pdpContainer.addClass('GEAT-216-pdp-container--sticky-open');
  }

  function addStickyContainerOnDesktop() {
    buyPanelAddToCart = $contentWrapper.find('.buypanel_addtocart');
    buyPanelAddToCart.append(stickyContainerHtml());

    geatStickyContainer = buyPanelAddToCart.children('.GEAT-216-sticky-container');

    smartGiftButton = buyPanelAddToCart.find('.pdp-smart-gift-button');
    smartGiftButton.addClass('GEAT-216-smart-gift-button');
  }

  function moveSizesOnDesktop() {
    setUpBuyPanelSizeList();
    // 18 extra pixels for aesthetics
    setSizeTitlePriceContainerHeight(18);
  }

  // //////////////
  // Mobile only
  // //////////////

  function updateElementsInBuyPanelOnMobile() {
    const giftButton = buyPanelAddToCart.children('.pdp-smart-gift-button');
    // screen width - width of quantity dropdown - margins (gutter left + between buttons + gutter right)
    const width = screenWidth - 100 - 49;

    giftButton.addClass('GEAT-216-gift-button');
    giftButton.css('width', width);
  }

  function buyPanelSizeListClonedSizeCallbackOnMobile(_, size) {
    const $item = prepareItemSize(size);

    $item.click(() => { currentlySelectedItemSize = $item; });
  }

  function moveSizesOnMobile() {
    buyPanelSizeList = $contentWrapper.find('#sizeChipList');
    buyPanelSizeListClone = buyPanelSizeList.clone();
    const parent = buyPanelSizeList.parent();

    const callback = ($item) => {
      const id = $item.attr('id');
      const listItem = buyPanelSizeListClone.find(`#${id}`);

      listItem.addClass('selected');
    };

    setUpBuyPanelSizeList((_, size) => sizeListSizesCallback(_, size, callback));

    buyPanelSizeListClone.removeAttr('data-reactid');

    buyPanelSizeListClone
      .children()
      .each(buyPanelSizeListClonedSizeCallbackOnMobile);

    closeSizeListOnMobile();
    parent.append(buyPanelSizeListClone);

    // 28 extra pixels for aesthetics
    setSizeTitlePriceContainerHeight(geatSizeTitlePriceContainer.height() + 28);
  }

  function closeSizeListOnMobile() {
    geatButtonsContainer.removeClass('GEAT-216-content-container__buttons--overlay-open');
    geatTopNavWrapper.removeClass('GEAT-216-top-nav-container--overlay-open');

    const darkBackground = geatStickyContainer.children('.GEAT-216-dark-background');

    if (darkBackground.length > 0) darkBackground.remove();

    return buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--closed');
  }

  function openSizeListOnMobile() {
    geatButtonsContainer.addClass('GEAT-216-content-container__buttons--overlay-open');
    geatTopNavWrapper.addClass('GEAT-216-top-nav-container--overlay-open');
    geatStickyContainer.prepend('<div class="GEAT-216-dark-background" />');

    geatStickyContainer
      .children('.GEAT-216-dark-background')
      // Extra 200 for a lil wiggle room
      .css('height', document.body.scrollHeight + 200)
      .click(handleCloseClick);

    return buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--closed');
  }

  function setUpTitlesAndPricesOnMobile(productPrice, productTitle) {
    geatSizeTitlePriceContainer = geatContentContainer
      .children('.GEAT-216-content-container__size-title-price');

    geatSizeTitlePriceContainer
      .children('.GEAT-216-title-price-heading-container')
      .prepend(productTitle)
      .append(productPrice);
  }

  function addSpecificBottomStyleOnMobile() {
    // container height + padding - button container height + extra for a lil cleaner transition
    const bottom = (geatSizeTitlePriceContainer.height() + 24 - 81 + 80) * -1;

    const bottomStyle = `
      <style type='text/css'>
        .GEAT-216-content-container__size-title-price--closed {
          bottom: ${bottom}px;
        }

        .GEAT-216-buypanel-sizelist--closed {
          bottom: ${bottom}px;
        }
      </style>
    `;

    jQuery(bottomStyle).appendTo('head');
  }

  function addStickyContainerOnMobile() {
    buyPanelAddToCart = $contentWrapper.find('.buypanel_addtocart');
    buyPanelAddToCart.prepend(stickyContainerHtml());

    geatStickyContainer = buyPanelAddToCart.children('.GEAT-216-sticky-container');

    updateElementsInBuyPanelOnMobile();
  }

  // //////////////
  // Tablet only
  // //////////////

  function handleGoToAppIFrameAppearing() {
    if (!isOnTablet) return;

    const $iFrameBranchBanner = jQuery('#branch-banner-iframe');

    if ($iFrameBranchBanner.length > 0) {
      geatStickyContainer.addClass('GEAT-216-sticky-container--iframe-open');
      pdpContainer.addClass('GEAT-216-pdp-container--iframe-open');
      buyPanelSizeList.addClass('GEAT-216-buypanel-sizelist--iframe-open');

      $iFrameBranchBanner
        .contents()
        .find('.branch-banner-close')
        .click(() => {
          geatStickyContainer.removeClass('GEAT-216-sticky-container--iframe-open')
          pdpContainer.removeClass('GEAT-216-pdp-container--iframe-open')
          buyPanelSizeList.removeClass('GEAT-216-buypanel-sizelist--iframe-open');
        });
    }
  }

  // //////////////
  // Base Functionality
  // //////////////

  // HTMLs
  const closeButtonHtml = () => `
    <div class="GEAT-216-close-link-container">
      <div class="GEAT-216-close-link">
        <span class="nav-list-mobile-icon GEAT-216-close-link__x" />
        <h4 class="GEAT-216-close-link__title"> Close</h4>
      </div>
    </div>
  `;

  const sizeErrorHtml = () => `
    <div class="GEAT-216-size-error">
      Please select size
    </div>
  `;

  const stickyContainerHtml = () => {
    if (isOnMobile) {
      return `
        <div class="pdp-redesign GEAT-216-sticky-container">
          <div class="GEAT-216-content-container">
            <div class="GEAT-216-content-container__size-title-price GEAT-216-content-container__size-title-price--closed">
              <div class="GEAT-216-title-price-heading-container" />
              ${sizeErrorHtml()}
              ${closeButtonHtml()}
            </div>

            <div class="GEAT-216-content-container__buttons" />
          </div>
        </div>
      `;
    }

    return `
      <div class="pdp-redesign GEAT-216-sticky-container GEAT-216-sticky-container--closed">
        <div class="GEAT-216-content-container">
          <div class="GEAT-216-title-price-heading-container" />
          <div class="GEAT-216-content-container__buttons" />
        </div>

        <div class="GEAT-216-content-container__size-title-price GEAT-216-content-container__size-title-price--closed">
          ${sizeErrorHtml()}
          ${closeButtonHtml()}
        </div>
      </div>
    `;
  };

  // Events
  function setUpTitlesAndPrices() {
    const buyPanelElements = pdpContainer.find('.buypanel').clone();
    const productPrice = buyPanelElements.find('.buypanel_productprice');
    const productTitle = buyPanelElements.find('.buypanel_producttitle');

    productPrice.addClass('GEAT-216-product-price');
    productTitle.addClass('GEAT-216-product-title');

    productTitle.children('.buypanel_cattitle').remove();

    if (isOnMobile) return setUpTitlesAndPricesOnMobile(productPrice, productTitle);

    return setUpTitlesAndPricesOnDesktop(productPrice, productTitle);
  }

  function addStickyContainer() {
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
      return;
    }

    moveSizesOnDesktop();
    handleGoToAppIFrameAppearing();
  }
const styles = `
  <style type='text/css'>
    .GEAT-216-close-link {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .GEAT-216-close-link__x:before {
      top: 0;
      transform: rotate(45deg);
    }

    .GEAT-216-close-link__x:after {
      top: 0;
      transform: rotate(-45deg);
    }

    .GEAT-216-content-container__buttons {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .GEAT-216-pdp-container.pdp-container.pdp-container-redesign .product-messaging {
      display: none;
    }

    .GEAT-216-size-error--active {
      border: 1px solid #e51b24;
      font-style: italic;
      padding: 10px 10px 8px;
    }

    @media (max-width: 767px) {
      /************
       * Containers
       ************/

      .GEAT-216-buypanel-sizelist {
        bottom: 81px;
        left: 15px;
        position: fixed;
        transition: bottom 0.6s linear;
        width: calc(100% - 30px);
        z-index: 109;
      }

      .GEAT-216-buypanel-sizelist--closed {
        bottom: -1000px;
      }

      .GEAT-216-close-link-container {
        position: absolute;
        right: 15px;
        top: 24px;
      }

      .GEAT-216-content-container__buttons {
        background: white;
        border-top: 0px solid #D3D3D3;
        box-shadow: 0px -3px 10px 0px rgba(0, 0, 0, 0.15);
        bottom: 0;
        height: 81px;
        padding: 21px 15px 15px;
        position: fixed;
        right: 0;
        transition: border-top 0.3s linear, box-shadow 0.3s linear;
        width: 100%;
        z-index: 110;
      }

      .GEAT-216-content-container__buttons--overlay-open {
        border-top: 1px solid #D3D3D3;
        box-shadow: 0px 30px 10px;
      }

      .GEAT-216-content-container__size-title-price {
        background: white;
        bottom: 81px;
        padding: 21px 15px 0;
        position: fixed;
        right: 0;
        transition: bottom 0.6s linear;
        width: 100%;
        /* TODO: update 108 to not be so forking arbitrary */
        z-index: 108;
      }

      .GEAT-216-content-container__size-title-price--closed {
        bottom: -1000px;
      }

      #ua-top-nav .top-nav-container.GEAT-216-top-nav-container--overlay-open {
        // z-index: 2;
      }

      /************
       * Items
       ************/

      .GEAT-216-close-link__title {
        display: none;
      }

      .GEAT-216-dark-background {
        background: black;
        left: 0;
        opacity: 0.3;
        position: absolute;
        top: -400px;
        width: 100%;
        z-index: 108;
      }

      .GEAT-216-gift-button {
        position: absolute;
      }

      .GEAT-216-product-price {
        display: none;
      }

      .GEAT-216-pdp-container.pdp-container .pdp-redesign .pdp-cta-btn {
        bottom: 15px;
        min-width: initial;
        position: fixed;
        right: 15px;
        top: initial;
        width: calc(48% - 15px);
        z-index: 110;
      }

      .GEAT-216-pdp-container .pdp-paypal-checkout-button.pdp-redesign {
        bottom: 15px;
        left: 15px;
        margin: 0;
        position: fixed;
        top: initial;
        width: calc(48% - 15px);
        z-index: 110;
      }

      .GEAT-216-size-error--active {
        margin-top: 15px;
      }

      .nav-list-mobile-icon.GEAT-216-close-link__x {
        background: transparent;
        margin: 0;
        margin-top: 3px;
      }

      .nav-list-mobile-icon.GEAT-216-close-link__x,
      .nav-list-mobile-icon.GEAT-216-close-link__x:after,
      .nav-list-mobile-icon.GEAT-216-close-link__x:before {
        width: 20px;
      }

      .pdp-redesign .size-chip.GEAT-216-size-list__size {
        border-radius: 4px;
        height: 35px;
        line-height: 2.4;
        margin-bottom: 20px;
        margin-right: 20px;
        min-width: 46px;
      }

      .pdp-redesign .size-chip.GEAT-216-size-list__size:last-child {
        margin-right: 20px;
      }

      .pdp-container.pdp-container-redesign .buypanel_producttitle.GEAT-216-product-title {
        font-size: 18px;
        margin: 0;
        margin-bottom: 14px;
      }
    }

    @media (min-width: 767px) {
      /************
       * Containers
       ************/

      .GEAT-216-sticky-container {
        background: white;
        box-shadow: 0px 10px 9px 0px rgba(0, 0, 0, 0.15);
        left: 0;
        min-height: 80px;
        padding: 15px 24px 24px calc(5% + 16px);
        position: fixed;
        top: 106px;
        // transition: top 0.8s ease-out;
        width: 100%;
        z-index: 4;
      }

      .GEAT-216-close-link-container {
        bottom: 15px;
        position: absolute;
        right: 24px;
      }

      .GEAT-216-content-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: relative;
      }

      .GEAT-216-content-container__size-title-price--closed {
        display: none;
      }

      .GEAT-216-content-container__buttons {
        max-height: 24px;
      }

      .GEAT-216-title-price-heading-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-top: 17px;
      }

      /* TODO: try and remove these */
      .GEAT-216-top-nav-container .ua-top-nav-site-nav {
        z-index: 2;
      }

      .GEAT-216-top-nav-container .ua-top-nav-messaging-container {
        z-index: 2;
      }

      .GEAT-216-top-nav-container .ua-top-nav-bar {
        z-index: 2;
      }

      .GEAT-216-pdp-container .product-thumbnail-images {
        z-index: 2;
      }

      .pdp-redesign.GEAT-216-sticky-container--closed {
        top: -280px;
        // transition: top 0.8s ease-in;
      }

      /************
       * Items
       ************/

      .GEAT-216-close-link {
        float: right;
        margin-right: 20px;
      }

      .GEAT-216-close-link:hover {
        color: #767676;
        cursor: pointer;
      }

      .pdp-container.pdp-container-redesign .buypanel_productprice.GEAT-216-product-price {
        font-size: 15px;
        margin: 0 0 0 15px;
      }

      .GEAT-216-product-title {
        font-size: 15px;
        line-height: 15px;
        margin: 0;
      }

      .GEAT-216-size-error {
        margin-top: 15px;
        max-width: 200px;
      }

      .GEAT-216-size-error--active {
        margin-top: 10px;
      }

      .buypanel_sizelist.GEAT-216-buypanel-sizelist--sticky-open {
        top: 188px;
        left: calc(5% + 16px);
        position: fixed;
        // transition: top 0.6s linear;
        width: 353px;
        z-index: 5;
      }

      .GEAT-216-buypanel-sizelist--sticky-open.GEAT-216-buypanel-sizelist--closed {
        display: none;
      }

      .GEAT-216-buypanel-sizelist--sticky-open.GEAT-216-buypanel-sizelist--error-active {
        top: 198px;
        transition: none;
      }

      .GEAT-216-close-link:hover .nav-list-mobile-icon.GEAT-216-close-link__x:after,
      .GEAT-216-close-link:hover .nav-list-mobile-icon.GEAT-216-close-link__x:before {
        background: #767676;
        transition: none;
      }

      .GEAT-216-div-cta-placeholder {
        height: 38px;
        width: 50px;
      }

      .GEAT-216-div-cta-placeholder:first-of-type {
        display: inline-block;
      }

      .GEAT-216-div-cta-placeholder:nth-of-type(2) {
        height: 170px;
      }

      .pdp-redesign .size-chip.GEAT-216-size-list__size {
        border-radius: 4px;
        margin-right: 15px;
      }

      .nav-list-mobile-icon.GEAT-216-close-link__x {
        background: transparent;
        margin: 9px 9px 0 0;
      }

      .nav-list-mobile-icon.GEAT-216-close-link__x,
      .nav-list-mobile-icon.GEAT-216-close-link__x:after,
      .nav-list-mobile-icon.GEAT-216-close-link__x:before {
        width: 16px;
        transition: none;
      }

      /* CTAs */

      .GEAT-216-pdp-container.pdp-container.GEAT-216-pdp-container--sticky-open .pdp-redesign .pdp-cta-btn,
      .GEAT-216-pdp-container.GEAT-216-pdp-container--sticky-open .pdp-paypal-checkout-button.pdp-redesign {
        position: fixed;
        top: 121px;
        // transition: top 0.8s ease-out;
        width: 200px;
        z-index: 110;
      }

      .GEAT-216-pdp-container.pdp-container.GEAT-216-pdp-container--sticky-open .pdp-redesign .pdp-cta-btn {
        right: 30px;
        min-width: initial;
      }

      .GEAT-216-pdp-container.GEAT-216-pdp-container--sticky-open .pdp-paypal-checkout-button.pdp-redesign {
        right: 245px;
        margin: 0;
      }

      // .GEAT-216-pdp-container.pdp-container .pdp-redesign .pdp-cta-btn.GEAT-216-cta-button--hidden,
      // .GEAT-216-pdp-container .pdp-paypal-checkout-button.pdp-redesign.GEAT-216-cta-button--hidden {
      //   top: -280px;
      //   transition: top 0.8s ease-in;
      // }

      .GEAT-216-smart-gift-button {
        margin-top: 16px;
      }

      .GEAT-216-pdp-container .pdp-paypal-checkout-button.pdp-redesign {
        margin-bottom: 0;
      }

      @media (min-width: 767px) and (max-width: 991px) {
        /************
         * Containers
         ************/

        .pdp-container.pdp-container-redesign .buypanel_producttitle.GEAT-216-product-title {
          font-size: 15px;
          line-height: 15px;
          margin: 0;
        }

        .pdp-container.pdp-container-redesign .buypanel_productprice.GEAT-216-product-price {
          font-size: 15px;
          padding: 0;
        }

        .GEAT-216-sticky-container--iframe-open {
          top: 186px;
        }

        /************
         * Items
         ************/

        .buypanel_sizelist.GEAT-216-buypanel-sizelist--sticky-open.GEAT-216-buypanel-sizelist--iframe-open {
          top: 268px;
        }

        .GEAT-216-buypanel-sizelist--sticky-open.GEAT-216-buypanel-sizelist--error-active.GEAT-216-buypanel-sizelist--iframe-open {
          top: 278px;
          transition: none;
        }

        .GEAT-216-pdp-container.pdp-container.GEAT-216-pdp-container--sticky-open .pdp-redesign .pdp-cta-btn,
        .GEAT-216-pdp-container.GEAT-216-pdp-container--sticky-open .pdp-paypal-checkout-button.pdp-redesign {
          width: 160px;
        }

        .GEAT-216-pdp-container.pdp-container.GEAT-216-pdp-container--sticky-open.GEAT-216-pdp-container--iframe-open .pdp-redesign .pdp-cta-btn,
        .GEAT-216-pdp-container.GEAT-216-pdp-container--sticky-open.GEAT-216-pdp-container--iframe-open .pdp-paypal-checkout-button.pdp-redesign {
          top: 201px;
        }

        .GEAT-216-pdp-container.GEAT-216-pdp-container--sticky-open .pdp-paypal-checkout-button.pdp-redesign {
          right: 204px;
        }

        .GEAT-216-product-title {
          max-width: 265px;
        }
      }
    }
  </style>
`;

  const offer = () => {
    jQuery(styles).appendTo('head');

    window.require('process').once('addToCart.complete', () => {
      console.log('checkout complete... add tracking event here');
      handleCloseClick();
    });

    screenWidth = window.screen.width;
    isOnMobile = screenWidth < 768;
    isOnTablet = screenWidth > 767 && screenWidth < 991;

    if (!isOnMobile) {
      // button position - message nav size - main nav size + button size
      buttonPosition = originalCheckoutButton.offset().top - 30 - 75 + 50;
      isStickyContainerOpen = false;
      jQuery(window).on('scroll', handleScrollOnDesktop);
    }

    handleCTAs();
    addStickyContainer();
  };

  runPoll(pollCondition, offer, 50);
}());

// TODOS
// -----
//
// General:
//
// Desktop:
// - Update transition
// - Update position where sticky comes in
//
// Mobile:
// - Sizes container spacing issue in compiled code
//
// Tablet:
// - Update position where sticky comes in
//
// QA:
//
// Blockers:
//
// Lessons:
// - Use toggle functions a lot more. You need conditionals
