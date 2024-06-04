
bridge.text_translate = null;
bridge.img_translate = null;
bridge.videos_translate = null;
bridge.links_translate = null;

$(window).on("beforeunload", function () {
	scorm.quit();
});

$(window).on("unload", function () {
	scorm.quit();
});

$(window).on(VIEW_EVENT.READY, function(){
	
});