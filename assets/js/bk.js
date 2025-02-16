revapi9.bind("revolution.slide.onloaded",function (e) {
	var _jws_theme_header_v4 = jQuery('.tb-header-v4'),
			_home_slide_v4 = jQuery('#home-slider-v4');
		if( _jws_theme_header_v4.length && _home_slide_v4.length ){
			function jws_theme_change_hei_slider(){
				var real_hei = _home_slide_v4.innerHeight();
				if( _home_slide_v4.innerHeight() < jQuery( window ).height() ){
					real_hei = '100vh';
					_jws_theme_header_v4.find('.mobile-leftbar').css('position', 'fixed' );
				}
				_jws_theme_header_v4.find('.mobile-leftbar').css('height', real_hei );
			}
			jws_theme_change_hei_slider();
			jQuery(window).on('resize', function(){
				jws_theme_change_hei_slider();
			});

		}
		
});