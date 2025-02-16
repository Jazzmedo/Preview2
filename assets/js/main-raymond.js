/* BTN EFFECT RIPPLE PLUGIN */

(function($) {
	"use strict";
	// window.jws_theme_is_mobile_tablet = function() {
		 	

	var RaymondObj = {
		// custom single woo slider
		jws_theme_fixheight_slider:function(){
			RaymondObj._yith_carousel = $('.ro-product-wrapper .caroufredsel_wrapper');			
			if( RaymondObj._yith_carousel.length ){

				RaymondObj._yith_carousel.css('max-height', RaymondObj._yith_carousel.find('li').first().height() );
			}
		},
		jws_theme_set_stick_bar:function( header_offset ){
			RaymondObj._header_offset = ( header_offset ) ? header_offset : ( ( RaymondObj._header_offset ) ? RaymondObj._header_offset : ( $('.tb-header-wrap .tb-header-menu').length > 0 ) ? $('.tb-header-wrap .tb-header-menu').offset() : 0 );
			if( RaymondObj._header_offset ){
				if ($(window).scrollTop() > RaymondObj._header_offset.top) {
					$('body').addClass('tb-stick-active');
				} else {
					$('body').removeClass('tb-stick-active');
				}
			}
		},
		jws_theme_added_viewcart:function( _this ){
			var _next = _this.next('a');
			if( wc_add_to_cart_params.i18n_view_cart.length === 0 || _this.parent().attr('data-original-title') === wc_add_to_cart_params.i18n_view_cart ) return;
			_next.hide();
			_this.parent().attr('data-original-title', wc_add_to_cart_params.i18n_view_cart ).delay(200).tooltip('show');
			_this.attr('href', wc_add_to_cart_params.cart_url );
		},
		jws_theme_added_wishlist:function( _this ){
			var browser_text = _this.parent().next().children('a').text();
			if( RaymondObj.wishlisted && _this.text() == browser_text ) return;
			_this.closest('[data-toggle="tooltip"]').attr('data-original-title', browser_text).delay(200).tooltip('show');
			RaymondObj.wishlisted = true;
		},
		jws_theme_refresh_addtocart:function( _this, callback ){
			var _refresh_viewcart = setInterval( function(){
				RaymondObj[callback](_this);
			}, 450);
			setTimeout( function(){
				clearInterval( _refresh_viewcart );
			},1200);
		},
		jws_theme_custom_scroll_v4: function(){
			var _mobile_nav = $('.mobile-leftbar');
			if( _mobile_nav.length===0 ) return;
			_mobile_nav.mCustomScrollbar();
			$('#mobile-bar-v4,.br-button').on('click', function(){
				_mobile_nav.toggleClass('active');
			});
			_mobile_nav.on('click',function(e){
				e.stopPropagation();
			});
			$('body').on('click', function(e){
				if( ! _mobile_nav.hasClass('active') ) return;
				_mobile_nav.removeClass('active');
			});
		},
		jws_theme_change_layout:function(){
			var _archive = $('.archive-products');
			if( _archive.length === 0 ) return;
			_archive.on('click','.jws_theme_action_layout', function(e){
				var cols = 3;
				if( $(this).hasClass('jws_theme_action_list') ){
					cols = 1;
				}else if( _archive.hasClass('grid-full-width') ){
					cols = 4;
				}

				_archive.find(':hidden[name="jws_theme_layout"]').prop('value', cols).removeAttr('disabled');

				setTimeout( function(){
					_archive.find('form.woocommerce-ordering').submit();
				},100);
				e.preventDefault();
			}).find('.tb-after-shop-loop .woocommerce-result-count').on('click','.jws_theme_action', function(e){
				e.preventDefault();
				var index = $(this).index();
				_archive.find('.jws_theme_action_layout').eq(index-1).trigger('click');
			});

		},
		jws_theme_change_price: function(){
			var _list_price = $('#tb-list-price');
			if( _list_price.length === 0 ) return;
			_list_price.find('option').each( function(){
				var value = $(this).val(),
					detail = value.split('-'),
					symbol = woocommerce_price_slider_params.currency_symbol;
				if( woocommerce_price_slider_params.currency_pos === 'left' ){
					value = [symbol,parseFloat( detail[0] ),' - ', symbol, parseFloat( detail[1] ) ];
					value = value.join('');
				}else{
					value = [parseFloat( detail[0] ), symbol, ' - ', parseFloat( detail[1] ), symbol];
					value = value.join('');
				}
				$(this).text( value );
			});
			_list_price.on('change', function(){
				var _this = $(this),
					value = _this.val(),
					detail = value.split('-');
				_this.next('#min_price').prop('value',parseFloat( detail[0] ) ).next('#max_price').prop('value',parseFloat( detail[1] ) );
				_this.attr('disabled','disabled');
				setTimeout( function(){
					_this.closest('form').submit();
				},100);
			});
		},
		jws_theme_porfolio:function(){
			var _porfolio = $('#tb-list-porfolio');
			if( _porfolio.length === 0 ) return;
			_porfolio.find('#porfolio-container').mixItUp();
		},
		jws_theme_back_to_top:function(){
			// Back to top btn
			var _jws_theme_back_to_top = $('#jws_theme_back_to_top');
			var _wHei = $(window).height();
			$(document).on('scroll',function () {
				/* back to top */
				var scroll_top = $(window).scrollTop();
				if ( scroll_top < _wHei ) {
					_jws_theme_back_to_top.addClass('no-active').removeClass('active');
				} else {
					_jws_theme_back_to_top.removeClass('no-active').addClass('active');
				}
			});
			_jws_theme_back_to_top.click(function () {
				$("html, body").animate({
					scrollTop: 0
				}, 1500);
			});
		},
		jws_theme_viewmore: function(){
			var _view_more = $('#tb-btn-viewmore');
			if( _view_more.lenght === 0 ) return;
			_view_more.on('click', function(e){
				e.preventDefault();
				var _this = $(this),
					_page = _this.attr('href'),
					data = {
						'link': _page,
						'args': _this.data('args'),
						'options': _this.data('options')
					};
				data.args.paged = _page.replace(/\D/g,'');

				RaymondObj.jws_theme_post( 'update_porfolio', data ).done( function(data){
					data = $.parseJSON( data );
					if( data.content.length > 0 ){
						var _porfolio = _this.closest('#tb-list-porfolio');
						_porfolio.find('#porfolio-container').append( data.content );
						var filter = _porfolio.find('.controls-filter').find('.active').data('filter');
						_porfolio.find('#porfolio-container').mixItUp( 'filter', filter );
						// change viewmore
						if( data.paged ){
							_this.attr('href', '#page/'+data.paged );
						}else{
							_this.fadeOut();
						}

						// change pagination
						if( data.pagination.length ){
							_porfolio.find('.pagination ').empty().append( data.pagination );
						}else{
							_porfolio.find('.pagination').fadeOUt();
						}

					}
				});
			})
		},
		jws_theme_wrap_carousel: function( _element ){
			if( _element.length === 0 ) return;
			_element.parent().addClass('tb-wrap-carousel');
		},
		jws_theme_post: function( action, data ){
			data = {
				'action': 'jws_theme_'+action,
				'data': data
			};
			return $.post( the_ajax_script.ajaxurl, data );
		},
		jws_theme_carousel: function( items, element, assiged ){
			var _element = $(element+items);
			if( _element.length === 0 && assiged ){
				_element = $(element);
				RaymondObj.assiged = true;
			}
			if( _element.length === 0 ) return;
			var _carousel_ops = {
				loop:true,
				margin:30,
				navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
				dots:false,
				responsiveClass:true,
				responsive:{
					0:{
						items:1,
					},
					768:{
						items: ( items > 2 ) ? ( items - 2 ) : ( items > 1 ) ? ( items - 1) : items,
					},
					992:{
						items: ( items > 1 ) ? ( items - 1 ) : items,
					},
					1200:{
						items:items,
						nav:true,
					}
				}
			};

			_element.find('.owl-carousel').owlCarousel( _carousel_ops );

			RaymondObj.jws_theme_set_pos_owlnav( _element );
			RaymondObj.jws_theme_wrap_carousel( _element );
		},
		jws_theme_set_pos_owlnav: function( _element ){
			if( _element.length === 0 ) return;
			_element.on('mouseenter', function(){
				if( ! RaymondObj.set_pos ){
					var top = _element.find('.tb-image').first().height()/2;
					if( top ){
						_element.find('.owl-prev').css('top', top).next('.owl-next').css('top', top);
					}
					RaymondObj.set_pos = true;
				}
			})

		},
		jws_theme_slider: function( _element, options ){
			// var _collection_slider = $('#colection_slider');
			options = $.extend( {
		        pagination: '.swiper-pagination',
		        paginationClickable: true
		    }, options );
			var swiper = new Swiper(_element, options);
		},
		jws_theme_owl_carousel: function(){
			// setTimeout(function(){
				$('.vc_images_carousel').each(function(){
					var _this = $(this),
						items = _this.data('per-view'),
						show_nav = ! _this.data('hide-nav');
					_this.find('.vc_carousel-slideline-inner').owlCarousel({
						items:items,
						loop:true,
						margin:30,
						navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
						dots:false,
						responsiveClass:true,
						responsive:{
							0:{
								items:(2 < items) ? 2 : items,
							},
							768:{
								items:(3 < items) ? 3 : items,
							},
							992:{
								items:( 4 < items) ? 4 : items,
								nav:show_nav
							},
							1200:{
								items:items,
								nav:show_nav,
							}
						}
					});
				});
			// }, 1000);
		},
		jws_theme_incremental: function(){
			var _increment = $('.tb-incremental');
			if( _increment.length === 0 ) return;
			_increment.each( function(){
				$(this).find('.incremental-counter').incrementalCounter();
			})
		},
		jws_theme_disabled_on_mobile: function(){
			if( ! window.jws_theme_is_mobile_tablet ) return;
			$('.product').on('click', '.tb-image', function(e){
				e.preventDefault();
			})
		},
		jws_theme_mega_nav: function( ){
			var _ct_nav = $('.ct-inc-megamenu'),
				_main_nav = $('#menu-primary-menu');
			if( _ct_nav.length === 0 || _main_nav.length === 0 ) return;
			RaymondObj.nav_maxwid = _ct_nav.next().width();
			RaymondObj.nav_maxwid = RaymondObj.nav_maxwid > 992 ? 992 : RaymondObj.nav_maxwid;
			_main_nav.find('.drop_full_width').attr('style','width:'+ RaymondObj.nav_maxwid +'!important' );

		},
		jws_theme_mega_search: function(){
			var _mega_search = $('#tb-mega-searchform');
			if( _mega_search.length === 0 ) return;
			_mega_search.on('change', 'select', function(){
				var cat = $(this).val();
				if( cat.length == 0 ){
					_mega_search.find('input[name="cat"]').attr('disabled', true);
				}else{
					_mega_search.find('input[name="cat"]').removeAttr('disabled').prop('value', cat );
				}
			});
		},
		jws_theme_run_ready:function(){
			RaymondObj.jws_theme_change_layout();
			RaymondObj.jws_theme_change_price();
			RaymondObj.jws_theme_porfolio();
			RaymondObj.jws_theme_viewmore();
			RaymondObj.jws_theme_carousel( 4,'.tb-product-carousel' );
			RaymondObj.jws_theme_carousel( 3, '.tb-product-carousel' );
			RaymondObj.jws_theme_carousel( 2, '.tb-product-carousel' );
			RaymondObj.jws_theme_carousel( 1, '.tb-product-carousel', true );
			RaymondObj.jws_theme_incremental();
			RaymondObj.jws_theme_back_to_top();
			RaymondObj.jws_theme_disabled_on_mobile();
			RaymondObj.jws_theme_custom_scroll_v4();
			RaymondObj.jws_theme_mega_search();
			// RaymondObj.jws_theme_mega_nav();
			RaymondObj.jws_theme_owl_carousel();
			// RaymondObj.jws_theme_slider( '#colection_slider .swiper-container' );
		}
	};

	

	// $(window).on('resize', function(){
	// 	RaymondObj.jws_theme_fixheight_slider();
	// });
	
	$(document).ready(function() {
		// tooltip
		RaymondObj.jws_theme_run_ready();

		$('[data-toggle="tooltip"]').tooltip();

		$('.tb-btn-prod').on('click','.btn-add-to-cart', function(e){
			// if( ! $(this).hasClass('product_type_variable') ){
				e.preventDefault();
				var _this = $(this);
				if( _this.hasClass('added') ){
					location.href=_this.next('a').attr('href');
				}else{
					RaymondObj.jws_theme_refresh_addtocart( _this, 'jws_theme_added_viewcart' );
				}
			// }
		}).on('click','.yith-wcwl-add-button a', function(e){
			e.preventDefault();
			var _this = $(this);
			RaymondObj.jws_theme_refresh_addtocart( _this, 'jws_theme_added_wishlist' );
		});


		// fix header v4
		
		$('.tb-blog-carousel .owl-carousel').owlCarousel({
			loop:true,
			margin:30,
			navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			dots:false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:2,
				},
				992:{
					items:3,
				},
				1200:{
					items:3,
					nav:true,
				}
			}
		});

		$('.tb-category-slider .tb-product-items').owlCarousel({
			loop:true,
			margin:30,
			navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			dots:false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:2,
				},
				992:{
					items:3,
				},
				1200:{
					items:4,
					nav:true,
				}
			}
		});

		RaymondObj.jws_theme_wrap_carousel( $('.tb-blog-carousel' ) );

		function ROtesttimonialSlider($elem) {
			if ($elem.length) {
				$elem.flexslider({
					animation: "slide",
					animationLoop: true,
					controlNav: true,
					slideshow: true,
					directionNav: false
				});
			}
		}
		ROtesttimonialSlider($('#tb-testimonial-1'));
		ROtesttimonialSlider($('#colection_slider'));
		
		function ROzoomImage() {
			var $window = $(window);
			$("#Ro_zoom_image > img").elevateZoom({
				zoomType: "lens",
				responsive: true,
				containLensZoom: true,
				cursor: 'pointer',
				gallery:'Ro_gallery_0',
				borderSize: 3,
				borderColour: "#84C340",
				galleryActiveClass: "ro-active",
				loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif'
			});

			$("#Ro_zoom_image > img").on("click", function(e) {
				var ez =   $('#Ro_zoom_image > img').data('elevateZoom');
					$.fancybox(ez.getGalleryList());
				return false;
			});
		}
		ROzoomImage();
		function ROheadervideo() {
			$("#ro-play-button").on("click", function(e){
				e.preventDefault();
					$.fancybox({
					'padding' : 0,
					'autoScale': false,
					'transitionIn': 'none',
					'transitionOut': 'none',
					'title': this.title,
					'width': 720,
					'height': 405,
					'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
					'type': 'swf',
					'swf': {
					'wmode': 'transparent',
					'allowfullscreen': 'true'
					}
				});
			});
		}
		ROheadervideo();
	
		
		/**
         * Add Product Quantity Up Down icon
         */
        $('form.cart .quantity').each(function() {
            $(this).prepend('<span class="qty-minus"><i class="fa fa-minus"></i></span>');
            $(this).append('<span class="qty-plus"><i class="fa fa-plus"></i></span>');
        });
        /* Plus Qty */
        $(document).on('click', '.qty-plus', function() {
            var parent = $(this).parent();
            $('input.qty', parent).val( parseInt($('input.qty', parent).val()) + 1);
        })
        /* Minus Qty */
        $(document).on('click', '.qty-minus', function() {
            var parent = $(this).parent();
            if( parseInt($('input.qty', parent).val()) > 1) {
                $('input.qty', parent).val( parseInt($('input.qty', parent).val()) - 1);
            }
        })
		
		/* On Page Cart */ 
		$('#tb-tab-container').easytabs();	
		
		// $(document).on('click', '.jws_theme_action', function (event) {
		// 	event.preventDefault();
		// 	var column = $(this).data('column');
		// 	$.post(
		// 		the_ajax_script.ajaxurl,
		// 		{
		// 			'action': 'jws_theme_hook_woo_columns',
		// 			'column':   column,
		// 		}, 
		// 		function(response){
		// 			console.log(response);
		// 			location.reload();
		// 		}
		// 	);
		// });
		
		/* Btn send mail */
		if($('.tb-send-mail').length > 0){
			$(".tb-send-mail").colorbox({inline:true, width:"100%", maxWidth: "800"});
		}
		
		/* Click btn search & cart on header */	
		var _jws_theme_menu_sidebar = $('.tb-menu-sidebar');
		if( _jws_theme_menu_sidebar.length ){
			_jws_theme_menu_sidebar.find(".shopping_cart_dropdown,.widget_searchform_content,.user_icon").click(function(e){
				e.stopPropagation();
			});
			if($('.widget_searchform_content').length > 0){
				$('a.icon_search_wrap').click(function (e) {
					e.stopPropagation();
					_jws_theme_menu_sidebar.find(".active").removeClass('active');
					$('.widget_searchform_content').toggleClass('active');
				});
				$('#tb-close-fullsearch').on('click', function(e){
					e.preventDefault();
					$(this).closest('.full_search').removeClass('active');
				});
			}

			if($('.user_icon').length){
				$('.user_icon').on('click', function(e){
					if( $(window).width() > 767 ){
						e.preventDefault();
					}
					_jws_theme_menu_sidebar.find(".active").removeClass('active');
					_jws_theme_menu_sidebar.find('.tb-menu-account').toggleClass('active');
				});
			}

			if($('.shopping_cart_dropdown').length > 0){
				$('.tb-header-wrap').off('click').on('click','a.icon_cart_wrap', function (e) {
					if( $(window).width() > 767 ){
						e.preventDefault();
					}
					e.stopPropagation();
					_jws_theme_menu_sidebar.find(".active").removeClass('active');
					$('.shopping_cart_dropdown').toggleClass('active');
				});
			}
			$('body').click(function(e){
				_jws_theme_menu_sidebar.find(".active").removeClass('active');
			});
		}

		if($('.tb-menu-canvas').length > 0){
			$('.header-menu-item-icon > a').click(function () {
					$('.tb-menu-canvas').toggleClass('active');
			});
		}
		/* Btn menu click */
		$('.tb-menu-control-mobi a').click(function(){
			$('.tb-menu-list').toggleClass('active');
		});
		/*Header stick*/
		function ROHeaderStick() {
			if( $('.tb-header-menu').length > 0 ){
				if($( '.tb-header-wrap' ).hasClass( 'tb-header-stick' )) {

					RaymondObj.jws_theme_set_stick_bar();

					$(window).off('scroll resize').on('scroll load resize', function() {
						RaymondObj.jws_theme_set_stick_bar();
					});
				}
			}
			
		}
		ROHeaderStick();
		// Same Height
		$('.row').each(function() {
			if ($(this).hasClass('same-height')) {
				var height = $(this).children().height();
				$(this).children().each(function() {
					$(this).css('min-height', height);
				});
			}
		});

		/*
		* Mobile Nav Menu Initialization and Event Handling
		*/
		var _mobile_leftbar = $('.mobile-leftbar');

		function initMobileNav() {

			$('.mobile-leftbar .fa-close').on('click', function(e) {
				$('.mobile-leftbar').removeClass('open');
				e.stopPropagation();
			});
			$('.mobile-header .fa-bars').on('click', function(e) {
				$('.mobile-leftbar').addClass('open');
				e.stopPropagation();
			});
		}
		if( _mobile_leftbar.length ){
			initMobileNav();
		}		
		
		
		//checkout
		$('.ro-checkout-process .ro-hr-line .ro-tab-1, .ro-customer-info .ro-edit-customer-info').click(function(){
			var process1 = $('.ro-checkout-process .ro-hr-line .ro-tab-1');
			process1.parent().parent().removeClass('ro-process-2');
			process1.parent().parent().addClass('ro-process-1');
			$('.ro-checkout-panel .ro-panel-1').css('display', 'block');
			$('.ro-checkout-panel .ro-panel-2').css('display', 'none');
		});
		$('.ro-checkout-process .ro-hr-line .ro-tab-2, .ro-checkout-panel .ro-btn-2').click(function(){
			var process2 = $('.ro-checkout-process .ro-hr-line .ro-tab-2');
			process2.parent().parent().removeClass('ro-process-1');
			process2.parent().parent().addClass('ro-process-2');
			$('.ro-checkout-panel .ro-panel-1').css('display', 'none');
			$('.ro-checkout-panel .ro-panel-2').css('display', 'block');
		});
	});

	window.addEventListener ? 
	window.addEventListener("load",jws_theme_onload_func,false) : 
	window.attachEvent && window.attachEvent("onload",jws_theme_onload_func);

	function jws_theme_onload_func(){
		// tickbar
		RaymondObj.jws_theme_set_stick_bar();
		// woo slider
		// RaymondObj.jws_theme_fixheight_slider();

		// $('.ro-product-wrapper .thumbnails').find('li').on('click', function(){
		// 	setTimeout( function(){
		// 		RaymondObj.jws_theme_fixheight_slider();	
		// 	}, 800)
			
		// });

		// func active tabs default
		$('.wpb_tabs').each(function(){
			var wpb_tabs_nav = $(this).find('.wpb_tabs_nav'),
				active_num = wpb_tabs_nav.data('active-tab');
			wpb_tabs_nav.find('li').eq(parseInt(active_num) - 1).trigger('click');
		})
		
		//setTimeout(function(){
			var $wpb_accordion = $('.wpb_accordion');
			if($wpb_accordion.length > 0 && $.fn.niceScroll !== undefined){
				$wpb_accordion.each(function(){
					$(this).find('.wpb_accordion_section').each(function(){
						$(this).css({display: 'block'});
						var nice = $(this).find('.wpb_accordion_content').niceScroll();
					})
				})
			}
		//}, 10)
		
		var $nice_scroll_class_js = $('.nice-scroll-class-js');
		if($nice_scroll_class_js.length > 0 && $.fn.niceScroll !== undefined){
			$nice_scroll_class_js.each(function(){
				$(this).niceScroll();
			})
		}
	}
	
})(window.jQuery)