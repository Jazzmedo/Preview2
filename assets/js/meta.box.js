jQuery(document).ready(function($) {
	"use strict";
	$('#post-formats-select input').change(checkformat);
	$('.wp-post-format-ui .post-format-options > a').click(checkformat);
	videoType();
	audioType();
	checkformat();
	quoteType();

	$("#jws_theme_post_quote_type").change(function() {
		quoteType();
	});

	$("#jws_theme_post_video_source").change(function() {
		videoType();
	});

	$("#jws_theme_post_audio_type").change(function() {
		audioType();
	});

	function checkformat() {
		"use strict";
		var formats = ["gallery","link","image","quote","video","audio","chat"];
		var format = $('#post-formats-select input:checked').attr('value');
		var i = 0;
		for(i = 0; i < formats.length; i++){
			if(formats[i] == format){
				$("#jws_theme_post_"+format+"").css('display', 'block');
			} else {
				$("#jws_theme_post_"+formats[i]+"").css('display', 'none');
			}
		}
	}

	function quoteType() {
		"use strict";
		switch ($("#jws_theme_post_quote_type").val()) {
		case 'custom':
			$("#post_quote_custom").css('display', 'block');
			break;
		default:
			$("#post_quote_custom").css('display', 'none');
			break;
		}
	}

	function audioType() {
		"use strict";
		switch ($("#jws_theme_post_audio_type").val()) {
		case '':
			$("#jws_theme_metabox_field_post_audio_url").css('display', 'none');
			break;
		case 'content':
			$("#jws_theme_metabox_field_post_audio_url").css('display', 'none');
			break;
		default:
			$("#jws_theme_metabox_field_post_audio_url").css('display', 'block');
			break;
		}
	}
	function videoType() {
		"use strict";
		switch ($("#jws_theme_post_video_source").val()) {
		case '':
			$("#jws_theme_video_setting").css('display', 'none');
			break;
		case 'post':
			$("#jws_theme_video_setting").css('display', 'none');
			break;
		case 'media':
			$("#jws_theme_metabox_field_post_video_type").css('display', 'block');
			$("#jws_theme_metabox_field_post_video_url").css('display', 'block');
			$("#jws_theme_metabox_field_post_preview_image").css('display', 'block');
			$("#jws_theme_metabox_field_post_video_youtube").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_vimeo").css('display', 'none');
			$("#jws_theme_video_setting").css('display', 'block');
			break;
		case 'youtube':
			$("#jws_theme_metabox_field_post_video_type").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_url").css('display', 'none');
			$("#jws_theme_metabox_field_post_preview_image").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_youtube").css('display', 'block');
			$("#jws_theme_metabox_field_post_video_vimeo").css('display', 'none');
			$("#jws_theme_video_setting").css('display', 'block');
			break;
		case 'vimeo':
			$("#jws_theme_metabox_field_post_video_type").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_url").css('display', 'none');
			$("#jws_theme_metabox_field_post_preview_image").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_youtube").css('display', 'none');
			$("#jws_theme_metabox_field_post_video_vimeo").css('display', 'block');
			$("#jws_theme_video_setting").css('display', 'block');
			break;
		}
	}
});