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

		var galleryOpts = {
			// Whether pressing the arrow keys should move to the next/previous slide.
			arrowNavigation: true
		};

		new LuminousGallery(
      document.querySelectorAll(".photos__photo"),
      galleryOpts
    );
	}	
}

const global = new Global();
global.init();