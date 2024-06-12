$(document).ready(function(){setTimeout(()=>{bridge.listRankingDB(a=>{console.log(a),controlRanking(a),$(".preloader").addClass("hide")})},3e3);{const n=$(".textDig"),o=$(".textDig").text();let t=0,e=!0;const a={current:null},r={current:null};n.text(""),a.current=setInterval(function(){++t>o.length&&(clearInterval(a.current),clearInterval(r.current),n.text(o))},180),r.current=setInterval(function(){var a=o.slice(0,t);e?n.text(a+"|"):n.text(a+" "),e=!e},150)}});const controlRanking=a=>{const t=getObjectFromLocalStorage("user").email;var e;t?(e=a.find(a=>a.id===t))?(e=e.data.maior,$(".currentScore").text(e),$(".nome").ellipsis({lines:1}),a.filter(a=>!a.data.desativo).forEach((a,t)=>{t=`
        <button class="rankingScore" data-index="${t}" data-nome="${a.data.nome||a.data.name}" data-pontos="${a.data.maior}" data-game1="${a.data.game1||"-"}" data-game2="${a.data.game2||"-"}" data-game3="${a.data.game3||"-"}">
          <div class="datBase">
            <p class="number">${t+1<10?"0":""}${t+1}</p>
            <p class="nome">${a.data.nome||a.data.name}</p>
            <p class="point">${a.data.maior} ${1==a.data.maior?"ponto":"pontos"}</p>
          </div>
          <div class="ico"></div>
        </button>`;$(".ranking .boxRanking").append(t)}),$(".rankingScore").on("click",function(){var a=$(this).data("nome"),t=($(this).data("pontos"),$(this).data("game1")),e=$(this).data("game2"),n=$(this).data("game3");$("#pop1").css("display","flex"),$("#pop1 .nome").text(a),$("#pop1 .game1").text(t),$("#pop1 .game2").text(e),$("#pop1 .game3").text(n)})):console.error("Usuário atual não encontrado nos resultados."):console.error("Email não encontrado no localStorage.")};
//# sourceMappingURL=script.js.map
