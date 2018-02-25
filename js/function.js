var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();

	$(".main").onepage_scroll({
		sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
		                                // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
		pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
		afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
		loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		keyboard: true,                  // You can activate the keyboard controls
		responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
		                                // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
		                                // the browser's width is less than 600, the fallback will kick in.
		direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
	});

	function calculate() {
		var price = $('#price').val();
		var hour = $('#hour').val();
		var rezult = price * hour;
		$('#rezult').html(addSpaces(rezult));
	}
	
	function addSpaces(nStr){
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return x1 + x2;
	}

	$('#price').on('blur', function() {
		calculate();
	});

	$('#hour').on('blur', function() {
		calculate();
	});

});

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

// function setGridMatch(columns) {
// 	var tallestcolumn = 0;
// 	columns.removeAttr('style');
// 	columns.each( function() {
// 		currentHeight = $(this).height();
// 		if(currentHeight > tallestcolumn) {
// 			tallestcolumn = currentHeight;
// 		}
// 	});
// 	setTimeout(function() {
// 		columns.css('minHeight', tallestcolumn);
// 	}, 100);
// }

