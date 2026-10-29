const diasEscolares = [
  {
    data: "2026-11-02",
    diaSemana: "SEGUNDA"
  },
  {
    data: "2026-11-03",
    diaSemana: "TERCA"
  },
  {
    data: "2026-11-04",
    diaSemana: "QUARTA"
  },
  {
    data: "2026-11-05",
    diaSemana: "QUINTA"
  },
  {
    data: "2026-11-06",
    diaSemana: "SEXTA"
  }
];

const periodos = [1, 2, 3, 4, 5];

const grade = [
  {
    id: "grade-001",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 1,
    professorId: "prof-daniel",
    valorOriginal: "INF5-A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-infantil-5",
    segmentoCodigo: "EDUCACAO_INFANTIL",
    disciplinaId: "disciplina-artes"
  },
  {
    id: "grade-002",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 2,
    professorId: "prof-daniel",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-003",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 3,
    professorId: "prof-daniel",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-004",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 1,
    professorId: "prof-elaine",
    valorOriginal: "3A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-3a",
    segmentoCodigo: "ANOS_INICIAIS",
    disciplinaId: "disciplina-ciencias"
  },
  {
    id: "grade-005",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 4,
    professorId: "prof-elaine",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-006",
    data: "2026-11-02",
    diaSemana: "SEGUNDA",
    periodo: 5,
    professorId: "prof-elaine",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-007",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 1,
    professorId: "prof-ana",
    valorOriginal: "8A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-8a",
    segmentoCodigo: "ANOS_FINAIS",
    disciplinaId: "disciplina-matematica"
  },
  {
    id: "grade-008",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 3,
    professorId: "prof-ana",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-009",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 5,
    professorId: "prof-ana",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-010",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 2,
    professorId: "prof-bruno",
    valorOriginal: "8A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-8a",
    segmentoCodigo: "ANOS_FINAIS",
    disciplinaId: "disciplina-lingua-portuguesa"
  },
  {
    id: "grade-011",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 3,
    professorId: "prof-bruno",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-012",
    data: "2026-11-03",
    diaSemana: "TERCA",
    periodo: 4,
    professorId: "prof-bruno",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-013",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 1,
    professorId: "prof-carla",
    valorOriginal: "2EM-A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-2a-em",
    segmentoCodigo: "ENSINO_MEDIO",
    disciplinaId: "disciplina-fisica"
  },
  {
    id: "grade-014",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 3,
    professorId: "prof-carla",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-015",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 4,
    professorId: "prof-carla",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-016",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 2,
    professorId: "prof-felipe",
    valorOriginal: "2EM-A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-2a-em",
    segmentoCodigo: "ENSINO_MEDIO",
    disciplinaId: "disciplina-fisica"
  },
  {
    id: "grade-017",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 4,
    professorId: "prof-felipe",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-018",
    data: "2026-11-04",
    diaSemana: "QUARTA",
    periodo: 5,
    professorId: "prof-felipe",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-019",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 1,
    professorId: "prof-ana",
    valorOriginal: "8A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-8a",
    segmentoCodigo: "ANOS_FINAIS",
    disciplinaId: "disciplina-matematica"
  },
  {
    id: "grade-020",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 2,
    professorId: "prof-ana",
    valorOriginal: "VALOR-NAO-MAPEADO",
    situacao: "VALOR_DESCONHECIDO",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-021",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 4,
    professorId: "prof-ana",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-022",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 1,
    professorId: "prof-bruno",
    valorOriginal: "8A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-8a",
    segmentoCodigo: "ANOS_FINAIS",
    disciplinaId: "disciplina-lingua-portuguesa"
  },
  {
    id: "grade-023",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 2,
    professorId: "prof-bruno",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-024",
    data: "2026-11-05",
    diaSemana: "QUINTA",
    periodo: 5,
    professorId: "prof-bruno",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-025",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 1,
    professorId: "prof-carla",
    valorOriginal: "8A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-8a",
    segmentoCodigo: "ANOS_FINAIS",
    disciplinaId: "disciplina-matematica"
  },
  {
    id: "grade-026",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 3,
    professorId: "prof-carla",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-027",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 4,
    professorId: "prof-carla",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-028",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 1,
    professorId: "prof-felipe",
    valorOriginal: "2EM-A",
    situacao: "AULA_REGULAR",
    turmaId: "turma-2a-em",
    segmentoCodigo: "ENSINO_MEDIO",
    disciplinaId: "disciplina-fisica"
  },
  {
    id: "grade-029",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 3,
    professorId: "prof-felipe",
    valorOriginal: "HA",
    situacao: "HORA_ATIVIDADE",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  },
  {
    id: "grade-030",
    data: "2026-11-06",
    diaSemana: "SEXTA",
    periodo: 5,
    professorId: "prof-felipe",
    valorOriginal: "----------",
    situacao: "SEM_AULA_REGISTRADA",
    turmaId: null,
    segmentoCodigo: null,
    disciplinaId: null
  }
];

module.exports = {
  diasEscolares,
  periodos,
  grade
};
