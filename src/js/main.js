bridge.text_translate = null;
bridge.img_translate = null;
bridge.videos_translate = null;
bridge.links_translate = null;
bridge.fullScreen = function(){
	const elem = document.documentElement;
    
	if (!document.fullscreenElement ) {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) { // Firefox
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { // IE/Edge
			elem.msRequestFullscreen();
		}
	}


}

$(window).on("beforeunload", function () {
	scorm.quit();
});

$(window).on("unload", function () {
	scorm.quit();
});

$(window).on(VIEW_EVENT.READY, function(){
	
});