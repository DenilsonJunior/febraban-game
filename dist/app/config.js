var config = {
    salvarDados: true,
    debug: false,
    waterMark: false,
    language: 'pt-br',
    lms: {
        name: 'default'
    },
    acessibility: {
        tools: false,
        outlines: false,
        vlibras: false,
        customLibras: false
    },
    behaviors: {
        adaptive: false,
        width: 1920,
        height: 1080,
        fontSize: 30
    },
    modalVoltar: {
        active: false,
        msg: 'Você quer continuar de onde parou ou reiniciar o curso?',
        yes: 'CONTINUAR',
        no: 'REINICIAR',
        color: '#0a698d'
    },
    pages: [
        {
            uid: '01_capa',
            src: '01_capa/index.html'
        },
        {
            uid: '02_menu',
            src: '02_menu/index.html'
        },
        {
            uid: '03_form',
            src: '03_form/index.html'
        },
        {
            uid: '04_game1-intro',
            src: '04_game1-intro/index.html'
        },
        {
            uid: '04_game1-player',
            src: '04_game1-player/index.html'
        },
        {
            uid: '04_game2-intro',
            src: '04_game2-intro/index.html'
        },
        {
            uid: '04_game2-player',
            src: '04_game2-player/index.html'
        },
        {
            uid: '04_game3-intro',
            src: '04_game3-intro/index.html'
        },
        {
            uid: '04_game3-player',
            src: '04_game3-player/index.html'
        },
        {
            uid: '05_ranking',
            src: '05_ranking/index.html'
        }
    ]
};
try {
    module.exports = config;
} catch (e) {}