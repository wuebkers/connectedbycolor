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

			// Create a Stripe client.
			// Note: this merchant has been set up for demo purposes.
			var stripe = Stripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

			// Create an instance of Elements.
			var elements = stripe.elements();

			// Custom styling can be passed to options when creating an Element.
			// (Note that this demo uses a wider set of styles than the guide below.)
			var style = {
				base: {
					color: '#32325d',
					fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
					fontSmoothing: 'antialiased',
					fontSize: '16px',
					'::placeholder': {
						color: '#aab7c4'
					},
					':-webkit-autofill': {
						color: '#32325d'
					}
				},
				invalid: {
					color: '#fa755a',
					iconColor: '#fa755a',
					':-webkit-autofill': {
						color: '#fa755a'
					}
				}
			};

			// Create an instance of the iban Element.
			var iban = elements.create('iban', {
				style: style,
				supportedCountries: ['SEPA']
			});

			// Add an instance of the iban Element into the `iban-element` <div>.
			iban.mount('#iban-element');

			var errorMessage = document.getElementById('error-message');
			var bankName = document.getElementById('bank-name');

			iban.on('change', function (event) {
				// Handle real-time validation errors from the iban Element.
				if (event.error) {
					errorMessage.textContent = event.error.message;
					errorMessage.classList.add('visible');
				} else {
					errorMessage.classList.remove('visible');
				}

				// Display bank name corresponding to IBAN, if available.
				if (event.bankName) {
					bankName.textContent = event.bankName;
					bankName.classList.add('visible');
				} else {
					bankName.classList.remove('visible');
				}
			});

			// Handle form submission.
			var form = document.getElementById('payment-form');
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				showLoading();

				var sourceData = {
					type: 'sepa_debit',
					currency: 'eur',
					owner: {
						name: document.querySelector('input[name="name"]').value,
						email: document.querySelector('input[name="email"]').value
					},
					mandate: {
						// Automatically send a mandate notification email to your customer
						// once the source is charged.
						notification_method: 'email'
					}
				};

				// Call `stripe.createSource` with the iban Element and additional options.
				stripe.createSource(iban, sourceData).then(function (result) {
					if (result.error) {
						// Inform the customer that there was an error.
						errorMessage.textContent = result.error.message;
						errorMessage.classList.add('visible');
						stopLoading();
					} else {
						// Send the Source to your server to create a charge.
						errorMessage.classList.remove('visible');
						stripeSourceHandler(result.source);
					}
				});
			});

			new LuminousGallery(document.querySelectorAll(".photos__photo"), galleryOpts);
		}
	}]);

	return Global;
}();

var global = new Global();
global.init();
//# sourceMappingURL=bundle.js.map
