const segmentos = [
  {
    id: "segmento-educacao-infantil",
    codigo: "EDUCACAO_INFANTIL",
    nome: "Educação Infantil"
  },
  {
    id: "segmento-anos-iniciais",
    codigo: "ANOS_INICIAIS",
    nome: "Anos Iniciais"
  },
  {
    id: "segmento-anos-finais",
    codigo: "ANOS_FINAIS",
    nome: "Anos Finais"
  },
  {
    id: "segmento-ensino-medio",
    codigo: "ENSINO_MEDIO",
    nome: "Ensino Médio"
  }
];

const disciplinas = [
  {
    id: "disciplina-artes",
    codigo: "ARTES",
    nome: "Artes"
  },
  {
    id: "disciplina-ciencias",
    codigo: "CIENCIAS",
    nome: "Ciências"
  },
  {
    id: "disciplina-fisica",
    codigo: "FISICA",
    nome: "Física"
  },
  {
    id: "disciplina-lingua-portuguesa",
    codigo: "LINGUA_PORTUGUESA",
    nome: "Língua Portuguesa"
  },
  {
    id: "disciplina-matematica",
    codigo: "MATEMATICA",
    nome: "Matemática"
  }
];

const turmas = [
  {
    id: "turma-infantil-5",
    codigo: "INF5-A",
    nome: "Infantil 5 A",
    segmentoCodigo: "EDUCACAO_INFANTIL",
    anoEscolar: "Infantil 5"
  },
  {
    id: "turma-3a",
    codigo: "3A",
    nome: "3º Ano A",
    segmentoCodigo: "ANOS_INICIAIS",
    anoEscolar: "3º ano"
  },
  {
    id: "turma-8a",
    codigo: "8A",
    nome: "8º Ano A",
    segmentoCodigo: "ANOS_FINAIS",
    anoEscolar: "8º ano"
  },
  {
    id: "turma-2a-em",
    codigo: "2EM-A",
    nome: "2ª Série A",
    segmentoCodigo: "ENSINO_MEDIO",
    anoEscolar: "2ª série"
  }
];

const professores = [
  {
    id: "prof-ana",
    nome: "Ana Souza",
    segmentosEmQueAtuaNormalmente: ["ANOS_FINAIS"],
    segmentosAutorizados: ["ANOS_FINAIS", "ENSINO_MEDIO"],
    disciplinasAutorizadas: ["MATEMATICA"]
  },
  {
    id: "prof-bruno",
    nome: "Bruno Lima",
    segmentosEmQueAtuaNormalmente: ["ANOS_FINAIS"],
    segmentosAutorizados: ["ANOS_FINAIS"],
    disciplinasAutorizadas: ["LINGUA_PORTUGUESA"]
  },
  {
    id: "prof-carla",
    nome: "Carla Mendes",
    segmentosEmQueAtuaNormalmente: ["ANOS_FINAIS", "ENSINO_MEDIO"],
    segmentosAutorizados: ["ANOS_FINAIS", "ENSINO_MEDIO"],
    disciplinasAutorizadas: ["FISICA", "MATEMATICA"]
  },
  {
    id: "prof-daniel",
    nome: "Daniel Oliveira",
    segmentosEmQueAtuaNormalmente: ["EDUCACAO_INFANTIL"],
    segmentosAutorizados: ["EDUCACAO_INFANTIL"],
    disciplinasAutorizadas: ["ARTES"]
  },
  {
    id: "prof-elaine",
    nome: "Elaine Costa",
    segmentosEmQueAtuaNormalmente: ["ANOS_INICIAIS"],
    segmentosAutorizados: ["ANOS_INICIAIS", "ANOS_FINAIS"],
    disciplinasAutorizadas: ["CIENCIAS", "MATEMATICA"]
  },
  {
    id: "prof-felipe",
    nome: "Felipe Martins",
    segmentosEmQueAtuaNormalmente: ["ENSINO_MEDIO"],
    segmentosAutorizados: ["ANOS_FINAIS", "ENSINO_MEDIO"],
    disciplinasAutorizadas: ["FISICA", "MATEMATICA"]
  }
];

module.exports = {
  segmentos,
  disciplinas,
  turmas,
  professores
};
