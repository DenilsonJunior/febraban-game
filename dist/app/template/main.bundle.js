!function o(t,l,c){function s(r,e){if(!l[r]){if(!t[r]){var n="function"==typeof require&&require;if(!e&&n)return n(r,!0);if(u)return u(r,!0);throw(e=new Error("Cannot find module '"+r+"'")).code="MODULE_NOT_FOUND",e}n=l[r]={exports:{}},t[r][0].call(n.exports,function(e){return s(t[r][1][e]||e)},n,n.exports,o,t,l,c)}return l[r].exports}for(var u="function"==typeof require&&require,e=0;e<c.length;e++)s(c[e]);return s}({1:[function(e,r,n){bridge.fullScreen=function(){const e=document.documentElement;document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?document.exitFullscreen?document.exitFullscreen().catch(e=>{console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)}):document.mozCancelFullScreen?document.mozCancelFullScreen().catch(e=>{console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)}):document.webkitExitFullscreen?document.webkitExitFullscreen().catch(e=>{console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)}):document.msExitFullscreen?document.msExitFullscreen().catch(e=>{console.error(`Error attempting to exit full-screen mode: ${e.message} (${e.name})`)}):console.error("Full-screen mode is not supported by this browser."):e.requestFullscreen?e.requestFullscreen().catch(e=>{console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)}):e.mozRequestFullScreen?e.mozRequestFullScreen().catch(e=>{console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)}):e.webkitRequestFullscreen?e.webkitRequestFullscreen().catch(e=>{console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)}):e.msRequestFullscreen?e.msRequestFullscreen().catch(e=>{console.error(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)}):console.error("Full-screen mode is not supported by this browser.")},$(window).on("beforeunload",function(){}),$(window).on("unload",function(){}),$(window).on(VIEW_EVENT.READY,function(){})},{}]},{},[1]);
//# sourceMappingURL=main.bundle.js.map