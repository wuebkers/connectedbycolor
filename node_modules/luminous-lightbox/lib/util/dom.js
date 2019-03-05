"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDOMElement = isDOMElement;
exports.addClasses = addClasses;
exports.removeClasses = removeClasses;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var HAS_DOM_2 = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object";
var HAS_SHADOW = typeof ShadowRoot !== "undefined";
/**
 * Determines whether an object is a DOM element or not.
 * @param {!Object} obj Object to check
 * @return {boolean} True if object is an element
 */

function isDOMElement(obj) {
  if (HAS_SHADOW && obj instanceof ShadowRoot) {
    return true;
  }

  return HAS_DOM_2 ? obj instanceof HTMLElement : obj && _typeof(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
}
/**
 * Adds an array of classes to an element
 * @param {!Element} el Element to add classes to
 * @param {!Array<!string>} classNames Class names to add
 * @return {void}
 */


function addClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.add(className);
  });
}
/**
 * Removes an array of classes from an element
 * @param {!Element} el Element to remove classes from
 * @param {!Array<!string>} classNames Classes to remove
 * @return {void}
 */


function removeClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.remove(className);
  });
}
//# sourceMappingURL=dom.js.map