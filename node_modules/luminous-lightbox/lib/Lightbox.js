"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dom = require("./util/dom");

var _throwIfMissing = _interopRequireDefault(require("./util/throwIfMissing"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39; // All officially-supported browsers have this, but it's easy to
// account for, just in case.

var HAS_ANIMATION = typeof document === "undefined" ? false : "animation" in document.createElement("div").style;
/**
 * Represents the default lightbox implementation
 */

var Lightbox =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {Object=} options Lightbox options
   */
  function Lightbox() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Lightbox);

    this._sizeImgWrapperEl = this._sizeImgWrapperEl.bind(this);
    this.showNext = this.showNext.bind(this);
    this.showPrevious = this.showPrevious.bind(this);
    this._completeOpen = this._completeOpen.bind(this);
    this._completeClose = this._completeClose.bind(this);
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleClose = this._handleClose.bind(this);

    var _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? null : _options$namespace,
        _options$parentEl = options.parentEl,
        parentEl = _options$parentEl === void 0 ? (0, _throwIfMissing.default)() : _options$parentEl,
        _options$triggerEl = options.triggerEl,
        triggerEl = _options$triggerEl === void 0 ? (0, _throwIfMissing.default)() : _options$triggerEl,
        _options$sourceAttrib = options.sourceAttribute,
        sourceAttribute = _options$sourceAttrib === void 0 ? (0, _throwIfMissing.default)() : _options$sourceAttrib,
        _options$caption = options.caption,
        caption = _options$caption === void 0 ? null : _options$caption,
        _options$includeImgix = options.includeImgixJSClass,
        includeImgixJSClass = _options$includeImgix === void 0 ? false : _options$includeImgix,
        _options$_gallery = options._gallery,
        _gallery = _options$_gallery === void 0 ? null : _options$_gallery,
        _options$_arrowNaviga = options._arrowNavigation,
        _arrowNavigation = _options$_arrowNaviga === void 0 ? null : _options$_arrowNaviga,
        _options$closeButtonE = options.closeButtonEnabled,
        closeButtonEnabled = _options$closeButtonE === void 0 ? true : _options$closeButtonE,
        _options$closeTrigger = options.closeTrigger,
        closeTrigger = _options$closeTrigger === void 0 ? "click" : _options$closeTrigger;

    this.settings = {
      namespace: namespace,
      parentEl: parentEl,
      triggerEl: triggerEl,
      sourceAttribute: sourceAttribute,
      caption: caption,
      includeImgixJSClass: includeImgixJSClass,
      _gallery: _gallery,
      _arrowNavigation: _arrowNavigation,
      closeButtonEnabled: closeButtonEnabled,
      onClose: options.onClose,
      closeTrigger: closeTrigger
    };

    if (!(0, _dom.isDOMElement)(this.settings.parentEl)) {
      throw new TypeError("`new Lightbox` requires a DOM element passed as `parentEl`.");
    }

    this.currentTrigger = this.settings.triggerEl;
    this.openClasses = this._buildClasses("open");
    this.openingClasses = this._buildClasses("opening");
    this.closingClasses = this._buildClasses("closing");
    this.hasBeenLoaded = false;
    this.elementBuilt = false;
  }
  /**
   * Handles closing of the lightbox
   * @param {!Event} e Event that triggered closing
   * @return {void}
   * @protected
   */


  _createClass(Lightbox, [{
    key: "_handleClose",
    value: function _handleClose(e) {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }

      var onClose = this.settings.onClose;

      if (onClose && typeof onClose === "function") {
        onClose();
      }
    }
    /**
     * Binds event listeners to the trigger element
     * @return {void}
     * @protected
     */

  }, {
    key: "_bindEventListeners",
    value: function _bindEventListeners() {
      this.el.addEventListener(this.settings.closeTrigger, this._handleClose);

      if (this.closeButtonEl) {
        this.closeButtonEl.addEventListener("click", this._handleClose);
      }
    }
    /**
     * Builds a class list using the namespace and suffix, if any.
     * @param {string} suffix Suffix to add to each class
     * @return {!Array<!string>} Class list
     * @protected
     */

  }, {
    key: "_buildClasses",
    value: function _buildClasses(suffix) {
      var classes = ["lum-".concat(suffix)];
      var ns = this.settings.namespace;

      if (ns) {
        classes.push("".concat(ns, "-").concat(suffix));
      }

      return classes;
    }
    /**
     * Creates the lightbox element
     * @return {void}
     * @protected
     */

  }, {
    key: "_buildElement",
    value: function _buildElement() {
      this.el = document.createElement("div");
      (0, _dom.addClasses)(this.el, this._buildClasses("lightbox"));
      this.innerEl = document.createElement("div");
      (0, _dom.addClasses)(this.innerEl, this._buildClasses("lightbox-inner"));
      this.el.appendChild(this.innerEl);
      var loaderEl = document.createElement("div");
      (0, _dom.addClasses)(loaderEl, this._buildClasses("lightbox-loader"));
      this.innerEl.appendChild(loaderEl);
      this.imgWrapperEl = document.createElement("div");
      (0, _dom.addClasses)(this.imgWrapperEl, this._buildClasses("lightbox-image-wrapper"));
      this.innerEl.appendChild(this.imgWrapperEl);
      var positionHelperEl = document.createElement("span");
      (0, _dom.addClasses)(positionHelperEl, this._buildClasses("lightbox-position-helper"));
      this.imgWrapperEl.appendChild(positionHelperEl);
      this.imgEl = document.createElement("img");
      (0, _dom.addClasses)(this.imgEl, this._buildClasses("img"));
      positionHelperEl.appendChild(this.imgEl);
      this.captionEl = document.createElement("p");
      (0, _dom.addClasses)(this.captionEl, this._buildClasses("lightbox-caption"));
      positionHelperEl.appendChild(this.captionEl);

      if (this.settings.closeButtonEnabled) {
        this.closeButtonEl = document.createElement("div");
        (0, _dom.addClasses)(this.closeButtonEl, this._buildClasses("close-button"));
        this.el.appendChild(this.closeButtonEl);
      }

      if (this.settings._gallery) {
        this._setUpGalleryElements();
      }

      this.settings.parentEl.appendChild(this.el);

      this._updateImgSrc();

      this._updateCaption();

      if (this.settings.includeImgixJSClass) {
        this.imgEl.classList.add("imgix-fluid");
      }
    }
    /**
     * Creates gallery elements such as previous/next buttons
     * @return {void}
     * @protected
     */

  }, {
    key: "_setUpGalleryElements",
    value: function _setUpGalleryElements() {
      this._buildGalleryButton("previous", this.showPrevious);

      this._buildGalleryButton("next", this.showNext);
    }
    /**
     * Creates a gallery button
     * @param {string} name Name of button
     * @param {!Function} fn Click handler
     * @return {void}
     * @protected
     */

  }, {
    key: "_buildGalleryButton",
    value: function _buildGalleryButton(name, fn) {
      var btn = document.createElement("button");
      this["".concat(name, "Button")] = btn;
      btn.innerText = name;
      (0, _dom.addClasses)(btn, this._buildClasses("".concat(name, "-button")));
      (0, _dom.addClasses)(btn, this._buildClasses("gallery-button"));
      this.innerEl.appendChild(btn);
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        fn();
      }, false);
    }
    /**
     * Sizes the image wrapper
     * @return {void}
     * @protected
     */

  }, {
    key: "_sizeImgWrapperEl",
    value: function _sizeImgWrapperEl() {
      var style = this.imgWrapperEl.style;
      style.width = "".concat(this.innerEl.clientWidth, "px");
      style.maxWidth = "".concat(this.innerEl.clientWidth, "px");
      style.height = "".concat(this.innerEl.clientHeight - this.captionEl.clientHeight, "px");
      style.maxHeight = "".concat(this.innerEl.clientHeight - this.captionEl.clientHeight, "px");
    }
    /**
     * Updates caption from settings
     * @return {void}
     * @protected
     */

  }, {
    key: "_updateCaption",
    value: function _updateCaption() {
      var captionType = _typeof(this.settings.caption);

      var caption = "";

      if (captionType === "string") {
        caption = this.settings.caption;
      } else if (captionType === "function") {
        caption = this.settings.caption(this.currentTrigger);
      }

      this.captionEl.innerHTML = caption;
    }
    /**
     * Updates image element from the trigger element's attributes
     * @return {void}
     * @protected
     */

  }, {
    key: "_updateImgSrc",
    value: function _updateImgSrc() {
      var _this = this;

      var imageURL = this.currentTrigger.getAttribute(this.settings.sourceAttribute);

      if (!imageURL) {
        throw new Error("No image URL was found in the ".concat(this.settings.sourceAttribute, " attribute of the trigger."));
      }

      var loadingClasses = this._buildClasses("loading");

      if (!this.hasBeenLoaded) {
        (0, _dom.addClasses)(this.el, loadingClasses);
      }

      this.imgEl.onload = function () {
        (0, _dom.removeClasses)(_this.el, loadingClasses);
        _this.hasBeenLoaded = true;
      };

      this.imgEl.setAttribute("src", imageURL);
    }
    /**
     * Handles key up/down events for moving between items
     * @param {!Event} e Keyboard event
     * @return {void}
     * @protected
     */

  }, {
    key: "_handleKeydown",
    value: function _handleKeydown(e) {
      if (e.keyCode == LEFT_ARROW) {
        this.showPrevious();
      } else if (e.keyCode == RIGHT_ARROW) {
        this.showNext();
      }
    }
    /**
     * Shows the next item if in a gallery
     * @return {void}
     */

  }, {
    key: "showNext",
    value: function showNext() {
      if (!this.settings._gallery) {
        return;
      }

      this.currentTrigger = this.settings._gallery.nextTrigger(this.currentTrigger);

      this._updateImgSrc();

      this._updateCaption();

      this._sizeImgWrapperEl();
    }
    /**
     * Shows the previous item if in a gallery
     * @return {void}
     */

  }, {
    key: "showPrevious",
    value: function showPrevious() {
      if (!this.settings._gallery) {
        return;
      }

      this.currentTrigger = this.settings._gallery.previousTrigger(this.currentTrigger);

      this._updateImgSrc();

      this._updateCaption();

      this._sizeImgWrapperEl();
    }
    /**
     * Opens the lightbox
     * @return {void}
     */

  }, {
    key: "open",
    value: function open() {
      if (!this.elementBuilt) {
        this._buildElement();

        this._bindEventListeners();

        this.elementBuilt = true;
      } // When opening, always reset to the trigger we were passed


      this.currentTrigger = this.settings.triggerEl; // Make sure to re-set the `img` `src`, in case it's been changed
      // by someone/something else.

      this._updateImgSrc();

      this._updateCaption();

      (0, _dom.addClasses)(this.el, this.openClasses);

      this._sizeImgWrapperEl();

      window.addEventListener("resize", this._sizeImgWrapperEl, false);

      if (this.settings._arrowNavigation) {
        window.addEventListener("keydown", this._handleKeydown, false);
      }

      if (HAS_ANIMATION) {
        this.el.addEventListener("animationend", this._completeOpen, false);
        (0, _dom.addClasses)(this.el, this.openingClasses);
      }
    }
    /**
     * Closes the lightbox
     * @return {void}
     */

  }, {
    key: "close",
    value: function close() {
      window.removeEventListener("resize", this._sizeImgWrapperEl, false);

      if (this.settings._arrowNavigation) {
        window.removeEventListener("keydown", this._handleKeydown, false);
      }

      if (HAS_ANIMATION) {
        this.el.addEventListener("animationend", this._completeClose, false);
        (0, _dom.addClasses)(this.el, this.closingClasses);
      } else {
        (0, _dom.removeClasses)(this.el, this.openClasses);
      }
    }
    /**
     * Handles animations on completion of opening the lightbox
     * @return {void}
     * @protected
     */

  }, {
    key: "_completeOpen",
    value: function _completeOpen() {
      this.el.removeEventListener("animationend", this._completeOpen, false);
      (0, _dom.removeClasses)(this.el, this.openingClasses);
    }
    /**
     * Handles animations on completion of closing the lightbox
     * @return {void}
     * @protected
     */

  }, {
    key: "_completeClose",
    value: function _completeClose() {
      this.el.removeEventListener("animationend", this._completeClose, false);
      (0, _dom.removeClasses)(this.el, this.openClasses);
      (0, _dom.removeClasses)(this.el, this.closingClasses);
    }
    /**
     * Destroys the lightbox
     * @return {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this.el) {
        this.settings.parentEl.removeChild(this.el);
      }
    }
  }]);

  return Lightbox;
}();

exports.default = Lightbox;
//# sourceMappingURL=Lightbox.js.map