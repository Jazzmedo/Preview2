(function($) {
	"use strict";
	tinymce.PluginManager.add('btnplay', function( editor )
	{
		editor.addButton('btnplay', {
			text: '',
			icon: 'play-mce-icon',
			tooltip: 'Button play video',
			onclick: function(e) {
				editor.insertContent('[btnplay icon="fa fa-play" text="" style="circle" el_class=""]');
			}
		});
	});
})(jQuery);