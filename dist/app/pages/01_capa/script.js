$(document).ready(function(){$(".init").on("click",function(){bridge.fullScreen(),navigate.next()});{const e=$(".text"),n=$(".text").text(),c=n;let t=0;const r={current:null};e.text(""),r.current=setInterval(function(){e.text(e.text()+c[t]),++t===c.length&&clearInterval(r.current)},50)}});
//# sourceMappingURL=script.js.map
