(function($) {
	"use strict";
	jQuery(document).ready(function($){
		if($('.jws_theme_upload_button').length >= 1) {
			window.cshero_uploadfield = '';

			$('.jws_theme_upload_button').live('click', function() {
				window.cshero_uploadfield = $('.upload_field', $(this).parent());
				jws_theme_show('Upload', 'media-upload.php?type=image&jws_theme_iframe=true', false);

				return false;
			});

			window.jws_theme_send_to_editor_backup = window.send_to_editor;
			window.send_to_editor = function(html) {
				if(window.cshero_uploadfield) {
					var image_url = $('img', html).attr('src');
					$(window.cshero_uploadfield).val(image_url);
					window.cshero_uploadfield = '';
					jws_theme_remove();
				} else {
					window.jws_theme_send_to_editor_backup(html);
				}
			}
		}
	});
})(jQuery);