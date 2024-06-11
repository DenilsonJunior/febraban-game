$(document).ready(function(){setTimeout(()=>{bridge.listRankingDB(t=>{console.log(t),controlRanking(t),$(".preloader").addClass("hide")})},3e3);{const n=$(".textDig"),o=$(".textDig").text();let e=0,a=!0;const t={current:null},r={current:null};n.text(""),t.current=setInterval(function(){++e>o.length&&(clearInterval(t.current),clearInterval(r.current),n.text(o))},180),r.current=setInterval(function(){var t=o.slice(0,e);a?n.text(t+"|"):n.text(t+" "),a=!a},150)}});const controlRanking=e=>{const a=getObjectFromLocalStorage("user").email;var t=e.filter(t=>t.id===a)[0].data.maior;$(".currentScore").text(t),$(".nome").ellipsis({lines:1}),e.filter(t=>!t.data.desativo).map((t,e)=>($(".ranking .boxRanking").append(`<button class="rankingScore" item="${e}" data-modal="#pop1">
        
        <div class="datBase">
            <p class="number">${e+1<10?"0":""}${e+1}</p>
            <p class="nome" >${t.data.nome||t.data.name}</p>
            <p class="point" >${t.data.maior} ${1==t.data.maior?"ponto":"pontos"}</p>
        </div>
        <div class="ico"></div>
        </button>`),t)),$(".rankingScore").on("click",function(){var t=$(this).attr("item");console.log(e[t]),$("#pop1").css("display","flex"),$("#pop1 .nome").text(e[t].data.nome||e[t].data.name),$("#pop1 .game1").text(e[t].data.game1||"-"),$("#pop1 .game2").text(e[t].data.game2||"-"),$("#pop1 .game3").text(e[t].data.game3||"-")})};
//# sourceMappingURL=script.js.map
