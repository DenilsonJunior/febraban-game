$(document).ready(function(){var t=shuffleArray(gameWord),e=t[0].word,a=shuffleArray(t[0].tips),i=e.split(""),o=2,s=0,c=0,n=0,r=10,d=15;function l(){setTimeout(function(){console.log(o,n*r),$("body").trigger("game",[o,n*r])},500)}function p(){s<=2&&($(".tip").addClass("tip"+(s+1)),$(".tip .text").text(a[s]),s+=1,$(".tip").css("opacity","0"),$(".tip").animate({opacity:1,"margin-left":"0"},400),3==s)&&window.countdownTimer(d,()=>{l()})}$(".info .value").text(`00:${d}:00`),p(),i.map(t=>($(".cards").append(`<div class="card" keycard="${removeDiacritics(t).toLowerCase()}">
        <div class="front"></div>
        <div class="back">
            <span>${t}</span>
        </div>
        </div>`),t)),$("[key]").on("click",function(){var t=String($(this).attr("key")).toLowerCase();$(`[keycard=${t}]`).addClass("correct"),p(),$(this).addClass("used"),1<=$(`[keycard=${t}]`).length&&(c+=$(`[keycard=${t}]`).length,t=$(`[keycard=${t}]`).length,n+=t,c==i.length)&&l()}),console.log(e),console.log(i)});
//# sourceMappingURL=script.js.map
