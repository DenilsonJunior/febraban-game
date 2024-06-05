bridge.text_translate = null;
bridge.img_translate = null;
bridge.videos_translate = null;
bridge.links_translate = null;
bridge.fullScreen = function() {
    const elem = document.documentElement;

    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        // Entrar em modo de tela cheia
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elem.mozRequestFullScreen) { // Firefox
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { // Chrome, Safari e Opera
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { // IE/Edge
            elem.msRequestFullscreen();
        }
    } else {
        // Sair do modo de tela cheia
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari e Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
};

$(window).on("beforeunload", function () {
	scorm.quit();
});

$(window).on("unload", function () {
	scorm.quit();
});

$(window).on(VIEW_EVENT.READY, function(){
	
});