(function($) {
	"use strict";
	var tb_primary_color = [the_ajax_script.primary_color],tb_main_styles,tb_secondary_color = [the_ajax_script.secondary_color];
		
	function tb_box_style(){
		var _box_style = $('#box-style-inline-css');
		tb_main_styles  = _box_style.text();
		if( _box_style.length ===0 ) return;
		tb_main_styles = _box_style.text();

		$('.panel-primary-color').on('click', 'li', function(){
			tb_change_style( $(this).data('color'), _box_style );
			$(this).addClass('active').siblings('.active').removeClass('active');
		});
		$('.panel-secondary-color').on('click', 'li', function(){
			console.log($(this).data('color'));
			tb_change_style1( $(this).data('color'), _box_style );
			$(this).addClass('active').siblings('.active').removeClass('active');
		});

		$('.panel-selector-btn').on('click', function(e){
			e.preventDefault();
			$('body').removeClass('wide boxed').addClass( $(this).data('value') );
			$(this).addClass('active').siblings('.active').removeClass('active');
		});

		$('.panel-primary-background').on('click','li', function(){
			$('body').addClass('tb-bg-image').css('background-image', 'url('+ the_ajax_script.assets_img+'patterns/' + $(this).data('name') +')' );
			$(this).addClass('active').siblings('.active').removeClass('active');
		});

		$('#panel-selector-reset').on('click', function(e){
			e.preventDefault();
			location.reload();
		});

		$('.panel-selector-open').on('click', function(){
			$(this).parent().toggleClass('in');
		})
		
	}
	function tb_change_style1( color, _element ){
		var secondary_color = tb_secondary_color.pop();
		console.log(color);
		
		if( color == secondary_color ) return;
		tb_main_styles = tb_main_styles.replace( new RegExp(secondary_color, 'g'), color );
		tb_secondary_color.push( color );
		_element.empty().append( tb_main_styles );
	}
	
	$(document).ready( function(){
		tb_box_style();
		tb_change_style1();
	})
	
})(window.jQuery)