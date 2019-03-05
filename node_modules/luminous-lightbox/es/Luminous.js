function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { isDOMElement } from "./util/dom";
import injectBaseStylesheet from "./injectBaseStylesheet";
import Lightbox from "./Lightbox";
/**
 * Represents the default luminous lightbox
 */

var Luminous =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {!Element} trigger Trigger element to open lightbox
   * @param {Object=} options Luminous options
   */
  function Luminous(trigger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Luminous);

    this.VERSION = "2.3.2";
    this.destroy = this.destroy.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this._handleKeyup = this._handleKeyup.bind(this);
    this.isOpen = false;
    this.trigger = trigger;

    if (!isDOMElement(this.trigger)) {
      throw new TypeError("`new Luminous` requires a DOM element as its first argument.");
    }

    var rootNode = document;

    if ("getRootNode" in this.trigger) {
      rootNode = this.trigger.getRootNode();
    } // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-lightbox`. Default `lum-`
    // prefixed classes will always be added as well.


    var namespace = options["namespace"] || null; // Which attribute to pull the lightbox image source from.

    var sourceAttribute = options["sourceAttribute"] || "href"; // Captions can be a literal string, or a function that receives the Luminous instance's trigger element as an argument and returns a string. Supports HTML, so use caution when dealing with user input.

    var caption = options["caption"] || null; // The event to listen to on the _trigger_ element: triggers opening.

    var openTrigger = options["openTrigger"] || "click"; // The event to listen to on the _lightbox_ element: triggers closing.

    var closeTrigger = options["closeTrigger"] || "click"; // Allow closing by pressing escape.

    var closeWithEscape = options["closeWithEscape"] || true; // Automatically close when the page is scrolled.

    var closeOnScroll = options["closeOnScroll"] || false;
    var closeButtonEnabled = options["showCloseButton"] != null ? options["showCloseButton"] : true;
    var appendToNode = options["appendToNode"] || (rootNode === document ? document.body : rootNode); // A selector defining what to append the lightbox element to.

    var appendToSelector = options["appendToSelector"] || null; // If present (and a function), this will be called
    // whenever the lightbox is opened.

    var onOpen = options["onOpen"] || null; // If present (and a function), this will be called
    // whenever the lightbox is closed.

    var onClose = options["onClose"] || null; // When true, adds the `imgix-fluid` class to the `img`
    // inside the lightbox. See https://github.com/imgix/imgix.js
    // for more information.

    var includeImgixJSClass = options["includeImgixJSClass"] || false; // Add base styles to the page. See the "Theming"
    // section of README.md for more information.

    var injectBaseStyles = options["injectBaseStyles"] || true; // Internal use only!

    var _gallery = options["_gallery"] || null;

    var _arrowNavigation = options["_arrowNavigation"] || null;

    this.settings = {
      namespace: namespace,
      sourceAttribute: sourceAttribute,
      caption: caption,
      openTrigger: openTrigger,
      closeTrigger: closeTrigger,
      closeWithEscape: closeWithEscape,
      closeOnScroll: closeOnScroll,
      closeButtonEnabled: closeButtonEnabled,
      appendToNode: appendToNode,
      appendToSelector: appendToSelector,
      onOpen: onOpen,
      onClose: onClose,
      includeImgixJSClass: includeImgixJSClass,
      injectBaseStyles: injectBaseStyles,
      _gallery: _gallery,
      _arrowNavigation: _arrowNavigation
    };
    var injectionRoot = document.body;

    if (appendToNode && "getRootNode" in appendToNode) {
      injectionRoot = appendToNode.getRootNode();
    }

    if (this.settings.injectBaseStyles) {
      injectBaseStylesheet(injectionRoot);
    }

    this._buildLightbox();

    this._bindEventListeners();
  }
  /**
   * Opens the lightbox
   * @param {Event=} e Event which triggered opening
   * @return {void}
   */


  _createClass(Luminous, [{
    key: "open",
    value: function open(e) {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }

      this.lightbox.open();

      if (this.settings.closeOnScroll) {
        window.addEventListener("scroll", this.close, false);
      }

      var onOpen = this.settings.onOpen;

      if (onOpen && typeof onOpen === "function") {
        onOpen();
      }

      this.isOpen = true;
    }
    /**
     * Closes the lightbox
     * @param {Event=} e Event which triggered closing
     * @return {void}
     */

  }, {
    key: "close",
    value: function close(e) {
      if (this.settings.closeOnScroll) {
        window.removeEventListener("scroll", this.close, false);
      }

      this.lightbox.close();
      var onClose = this.settings.onClose;

      if (onClose && typeof onClose === "function") {
        onClose();
      }

      this.isOpen = false;
    }
    /**
     * Builds the internal lightbox instance
     * @protected
     * @return {void}
     */

  }, {
    key: "_buildLightbox",
    value: function _buildLightbox() {
      var parentEl = this.settings.appendToNode;

      if (this.settings.appendToSelector) {
        parentEl = document.querySelector(this.settings.appendToSelector);
      }

      this.lightbox = new Lightbox({
        namespace: this.settings.namespace,
        parentEl: parentEl,
        triggerEl: this.trigger,
        sourceAttribute: this.settings.sourceAttribute,
        caption: this.settings.caption,
        includeImgixJSClass: this.settings.includeImgixJSClass,
        closeButtonEnabled: this.settings.closeButtonEnabled,
        _gallery: this.settings._gallery,
        _arrowNavigation: this.settings._arrowNavigation,
        closeTrigger: this.settings.closeTrigger,
        onClose: this.close
      });
    }
    /**
     * Binds lightbox events to the trigger element
     * @protected
     * @return {void}
     */

  }, {
    key: "_bindEventListeners",
    value: function _bindEventListeners() {
      this.trigger.addEventListener(this.settings.openTrigger, this.open, false);

      if (this.settings.closeWithEscape) {
        window.addEventListener("keyup", this._handleKeyup, false);
      }
    }
    /**
     * Unbinds all events
     * @protected
     * @return {void}
     */

  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      this.trigger.removeEventListener(this.settings.openTrigger, this.open, false);

      if (this.lightbox.el) {
        this.lightbox.el.removeEventListener(this.settings.closeTrigger, this.close, false);
      }

      if (this.settings.closeWithEscape) {
        window.removeEventListener("keyup", this._handleKeyup, false);
      }
    }
    /**
     * Handles key up events and closes lightbox when esc is pressed
     * @param {!Event} e Keyboard event
     * @return {void}
     * @protected
     */

  }, {
    key: "_handleKeyup",
    value: function _handleKeyup(e) {
      if (this.isOpen && e.keyCode === 27) {
        this.close();
      }
    }
    /**
     * Destroys internal lightbox and unbinds events
     * @return {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this._unbindEvents();

      this.lightbox.destroy();
    }
  }]);

  return Luminous;
}();
/* eslint-disable no-self-assign */


export { Luminous as default };
Luminous.prototype["open"] = Luminous.prototype.open;
Luminous.prototype["close"] = Luminous.prototype.close;
Luminous.prototype["destroy"] = Luminous.prototype.destroy;
/* eslint-enable no-self-assign */
//# sourceMappingURL=Luminous.js.map