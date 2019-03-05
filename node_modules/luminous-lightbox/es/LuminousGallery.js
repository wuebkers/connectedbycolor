function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import Luminous from "./Luminous";
/**
 * Represents a gallery-style lightbox
 */

var LuminousGallery =
/*#__PURE__*/
function () {
  /**
   * Constructor
   * @param {!Array<!Element>} triggers Array of trigger elements
   * @param {Object=} options Gallery options
   * @param {Object=} luminousOpts Luminous options
   */
  function LuminousGallery(triggers) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var luminousOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, LuminousGallery);

    var optionsDefaults = {
      arrowNavigation: true
    };
    this.settings = Object.assign({}, optionsDefaults, options);
    this.triggers = triggers;
    this.luminousOpts = luminousOpts;
    this.luminousOpts["_gallery"] = this;
    this.luminousOpts["_arrowNavigation"] = this.settings["arrowNavigation"];

    this._constructLuminousInstances();
  }
  /**
   * Creates internal luminous instances
   * @protected
   * @return {void}
   */


  _createClass(LuminousGallery, [{
    key: "_constructLuminousInstances",
    value: function _constructLuminousInstances() {
      this.luminousInstances = [];
      var triggerLen = this.triggers.length;

      for (var i = 0; i < triggerLen; i++) {
        var trigger = this.triggers[i];
        var lum = new Luminous(trigger, this.luminousOpts);
        this.luminousInstances.push(lum);
      }
    }
    /**
     * Determines the next trigger element
     * @param {!Element} trigger Current trigger element
     * @return {!Element}
     */

  }, {
    key: "nextTrigger",
    value: function nextTrigger(trigger) {
      var nextTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) + 1;
      return nextTriggerIndex >= this.triggers.length ? this.triggers[0] : this.triggers[nextTriggerIndex];
    }
    /**
     * Determines the previous trigger element
     * @param {!Element} trigger Current trigger element
     * @return {!Element}
     */

  }, {
    key: "previousTrigger",
    value: function previousTrigger(trigger) {
      var prevTriggerIndex = Array.prototype.indexOf.call(this.triggers, trigger) - 1;
      return prevTriggerIndex < 0 ? this.triggers[this.triggers.length - 1] : this.triggers[prevTriggerIndex];
    }
    /**
     * Destroys the internal luminous instances
     * @return {void}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.luminousInstances.forEach(function (instance) {
        return instance.destroy();
      });
    }
  }]);

  return LuminousGallery;
}();
/* eslint-disable-next-line no-self-assign */


export { LuminousGallery as default };
LuminousGallery.prototype["destroy"] = LuminousGallery.prototype.destroy;
//# sourceMappingURL=LuminousGallery.js.map