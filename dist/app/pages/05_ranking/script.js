$(document).ready(function(){setTimeout(()=>{bridge.listRankingDB(a=>{console.log(a),controlRanking(a),$(".preloader").addClass("hide")})},3e3)});const controlRanking=t=>{const o=getObjectFromLocalStorage("user").email;var a=t.filter(a=>a.id===o)[0].data.maior;$(".currentScore").text(a),$(".nome").ellipsis({lines:1}),t.map((a,t)=>($(".ranking .boxRanking").append(`<button class="rankingScore" item="${t}" data-modal="#pop1">
        
        <div class="datBase">
            <p class="number">${t+1<10?"0":""}${t+1}</p>
            <p class="nome" >${a.data.nome||a.data.name}</p>
            <p class="point" >${a.data.maior} ${1==a.data.maior?"ponto":"pontos"}</p>
        </div>
        <div class="ico"></div>
        </button>`),a)),$(".rankingScore").on("click",function(){var a=$(this).attr("item");console.log(t[a]),$("#pop1").css("display","flex"),$("#pop1 .nome").text(t[a].data.nome||t[a].data.name),$("#pop1 .game1").text(t[a].data.game1||"-"),$("#pop1 .game2").text(t[a].data.game2||"-"),$("#pop1 .game3").text(t[a].data.game3||"-")})};
//# sourceMappingURL=script.js.map
