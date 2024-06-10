window.countdownTimer=function(t,a){let e=t,o=0;const r=setInterval(()=>{0===e&&0===o?(clearInterval(r),$(".info .value").text("00:00:00"),a()):--o<0&&(o=99,--e);n=e,t=o;var t,n=`00:${n.toString().padStart(2,"0")}:`+t.toString().padStart(2,"0");$(".info .value").text(n)},10)};
//# sourceMappingURL=countdownTimer.js.map
