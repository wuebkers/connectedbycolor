'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var slider = function () {
	function slider() {
		_classCallCheck(this, slider);
	}

	_createClass(slider, [{
		key: 'init',
		value: function init() {
			$('.slide-wrapper').slick({
				slidesToShow: 1,
				dots: true
			});
		}
	}]);

	return slider;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Global = function () {
	function Global() {
		_classCallCheck(this, Global);
	}

	_createClass(Global, [{
		key: 'init',
		value: function init() {
			// Backround color scroll animation
			$(window).on('scroll', function () {

				var scrollPercent = $(document).scrollTop() / 80;
				var scalePercent = $(document).scrollTop() / 30 + 100;
				if (window.innerWidth > 768) {
					$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size: ' + scalePercent + '% auto');
				}
			});

			var galleryOpts = {
				// Whether pressing the arrow keys should move to the next/previous slide.
				arrowNavigation: true
			};

			new LuminousGallery(document.querySelectorAll(".photos__photo"), galleryOpts);
		}
	}]);

	return Global;
}();

var global = new Global();
global.init();
//# sourceMappingURL=bundle.js.map
