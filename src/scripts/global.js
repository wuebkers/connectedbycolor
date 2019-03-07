class Global {
	constructor() {

	}

	init() {
		// Backround color scroll animation
		$(window).on('scroll', function () {

			var scrollPercent = $(document).scrollTop() / 80;
			var scalePercent = ($(document).scrollTop() / 30) + 100;
			if(window.innerWidth > 768) {
				$('.hero__media').attr('style', 'filter: blur(' + scrollPercent + 'px); background-size: ' + scalePercent + '% auto');
			}
		});

		$(window).on('keyup', function() {
			var val = $('.donate-amount').val()*100

			$('.form-button').attr('data-amount', val);
		});
	}	
}

const global = new Global();
global.init();