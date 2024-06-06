var gameWord = [
  {
    word: "ouvidoria",
    tips: [
      "Canal responsável por receber, analisar e responder às manifestações dos clientes de forma eficiente e transparente.",
      "Canal de comunicação da empresa com os clientes, onde podem expressar opiniões, sugestões e reclamações.",
      "Funciona como um intermediário entre os clientes e a empresa, buscando solucionar conflitos de forma imparcial.",
      "Contribui para o aprimoramento dos produtos, serviços e processos da empresa através do feedback recebido dos clientes.",
      "Promove a abertura e a honestidade nas relações entre empresa e clientes, fortalecendo a confiança e a credibilidade da marca.",
      "Permite que colaboradores e partes interessadas relatem condutas inadequadas ou antiéticas de forma anônima e segura.",
      "Utiliza as informações e sugestões recebidas para desenvolver treinamentos e capacitações que melhorem a qualidade do serviço prestado.",
      "Desempenha um papel fundamental na melhoria dos processos internos das instituições financeiras com base no feedback dos clientes.",
      "Contribui para o aprimoramento dos produtos e serviços financeiros, levando em consideração as demandas e expectativas dos clientes.",
      "Promove a cultura de compliance e ética nas operações financeiras, assegurando o cumprimento das normas regulatórias.",
      "É um importante instrumento de controle e governança nas instituições financeiras, auxiliando na identificação e prevenção de irregularidades.",
      "Desempenha um papel importante na identificação e na gestão dos riscos operacionais e reputacionais das instituições financeiras",
    ],
  },
  {
    word: "agronegócio",
    tips: [
      "Tem fundamental importância na economia brasileira",
      "É responsável por mais de 25% do PIB Nacional",
      "Gera emprego e renda para milhões de pessoas",
      "Está relacionado a vários setores da economia",
      "A sustentabilidade passa a ser um pilar fundamental nas práticas desse setor, buscando minimizar impactos negativos no meio ambiente.",
      "Esse setor está passando por uma verdadeira revolução impulsionada pelas novas tecnologias e inovações.",
      ".... é Pop!",
      "As mudanças climáticas afetam diretamente esse setor",
      "A área, clima e condições do Brasil favorecem ",
      "É impossível falar sobre a economia do Brasil sem falar sobre esse setor",
      "Muitos produtos desse setor são exportados",
      "Muitos produtores, cooperativas e associações do setor recorrem ao crédito para investir no crescimento de seus negócios",
    ],
  },
  {
    word: "câmbio",
    tips: [
      "Certificação relacionada a trocas e variações monetárias.",
      "Palavra associada a um comando utilizado em comunicação por rádio.",
      "Representa a troca ou transmissão de informações, sinais ou até mesmo moedas em diferentes situações. ",
      "Peça fundamental em veículos automotivos.",
      "Mercado onde ocorre a troca de moedas estrangeiras.",
      "Permite a transmissão de potência do motor para as rodas.",
      "Afeta diretamente as exportações e importações de um país.",
      "Pode ser manual ou automático.",
      "Pode ser volátil e sujeito a flutuações.",
      "É influenciado por fatores econômicos globais, como taxas de juros e políticas monetárias.",
      "É acompanhado de perto por investidores, empresas e governos.",
      "Facilita a mudança de marchas.",
      "É encontrado em carros, caminhões e motocicletas.",
      "Influencia o valor das importações e exportações de um país.",
      "Pode ser utilizado para proteção contra riscos cambiais em transações comerciais.",
    ],
  },
];

var shuffleArray = function (array) {
  let shuffledArray = [...array]; // Cria uma cópia do array original para não modificar o original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

var removeDiacritics = function (str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C");
};
