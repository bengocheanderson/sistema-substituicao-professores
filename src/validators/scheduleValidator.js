const SITUACOES_VALIDAS = new Set([
  "AULA_REGULAR",
  "HORA_ATIVIDADE",
  "SEM_AULA_REGISTRADA",
  "VALOR_DESCONHECIDO"
]);

const CAMPOS_NAO_AULA = [
  "turmaId",
  "segmentoCodigo",
  "disciplinaId"
];

function validateSchedule(scheduleData, referenceData) {
  const erros = [];
  const avisos = [];
  const resumo = {
    diasValidados: 0,
    periodosValidados: 0,
    celulasProcessadas: 0
  };

  const adicionarErro = (codigo, mensagem, registroId = null, campo = null) => {
    erros.push({
      codigo,
      mensagem,
      registroId,
      campo
    });
  };

  const adicionarAviso = (codigo, mensagem, registroId = null, campo = null) => {
    avisos.push({
      codigo,
      mensagem,
      registroId,
      campo
    });
  };

  if (!ehObjeto(scheduleData)) {
    adicionarErro(
      "DADOS_DA_GRADE_INVALIDOS",
      "Os dados da grade devem ser um objeto."
    );
    return criarResultado(erros, avisos, resumo);
  }

  if (!ehObjeto(referenceData)) {
    adicionarErro(
      "DADOS_DE_REFERENCIA_INVALIDOS",
      "Os dados de referência devem ser um objeto."
    );
    return criarResultado(erros, avisos, resumo);
  }

  const colecoesGrade = ["diasEscolares", "periodos", "grade"];
  const colecoesReferencia = [
    "segmentos",
    "disciplinas",
    "turmas",
    "professores"
  ];

  for (const nomeColecao of colecoesGrade) {
    if (!Array.isArray(scheduleData[nomeColecao])) {
      adicionarErro(
        "COLECAO_DA_GRADE_INVALIDA",
        `A coleção ${nomeColecao} deve existir e ser um array.`,
        null,
        nomeColecao
      );
    }
  }

  for (const nomeColecao of colecoesReferencia) {
    if (!Array.isArray(referenceData[nomeColecao])) {
      adicionarErro(
        "COLECAO_DE_REFERENCIA_INVALIDA",
        `A coleção ${nomeColecao} deve existir e ser um array.`,
        null,
        nomeColecao
      );
    }
  }

  if (erros.length > 0) {
    return criarResultado(erros, avisos, resumo);
  }

  const { diasEscolares, periodos, grade } = scheduleData;
  const { segmentos, disciplinas, turmas, professores } = referenceData;

  validarRegistrosDeReferencia(
    segmentos,
    "segmento",
    ["id", "codigo", "nome"],
    [],
    adicionarErro
  );
  validarRegistrosDeReferencia(
    disciplinas,
    "disciplina",
    ["id", "codigo", "nome"],
    [],
    adicionarErro
  );
  validarRegistrosDeReferencia(
    turmas,
    "turma",
    ["id", "codigo", "nome", "segmentoCodigo", "anoEscolar"],
    [],
    adicionarErro
  );
  validarRegistrosDeReferencia(
    professores,
    "professor",
    ["id", "nome"],
    [
      "segmentosEmQueAtuaNormalmente",
      "segmentosAutorizados",
      "disciplinasAutorizadas"
    ],
    adicionarErro
  );

  validarIdsUnicos(
    segmentos,
    "SEGMENTO_ID_DUPLICADO",
    "segmento",
    adicionarErro
  );
  validarIdsUnicos(
    disciplinas,
    "DISCIPLINA_ID_DUPLICADO",
    "disciplina",
    adicionarErro
  );
  validarIdsUnicos(
    turmas,
    "TURMA_ID_DUPLICADO",
    "turma",
    adicionarErro
  );
  validarIdsUnicos(
    professores,
    "PROFESSOR_ID_DUPLICADO",
    "professor",
    adicionarErro
  );
  validarIdsUnicos(grade, "GRADE_ID_DUPLICADO", "célula", adicionarErro);

  const diasPorData = new Map();
  for (const dia of diasEscolares) {
    if (!ehObjeto(dia)) {
      adicionarErro(
        "DIA_ESCOLAR_INVALIDO",
        "Cada dia escolar deve ser um objeto.",
        null,
        "diasEscolares"
      );
      continue;
    }

    if (!ehTextoNaoVazio(dia.data) || !ehTextoNaoVazio(dia.diaSemana)) {
      adicionarErro(
        "DIA_ESCOLAR_INCOMPLETO",
        "Cada dia escolar deve possuir data e dia da semana.",
        dia.data || null,
        "diasEscolares"
      );
      continue;
    }

    if (diasPorData.has(dia.data)) {
      adicionarErro(
        "DATA_ESCOLAR_DUPLICADA",
        `A data ${dia.data} foi declarada mais de uma vez.`,
        dia.data,
        "data"
      );
    } else {
      diasPorData.set(dia.data, dia);
    }
  }

  resumo.diasValidados = diasPorData.size;

  const periodosValidos = new Set();
  for (const periodo of periodos) {
    if (!Number.isInteger(periodo) || periodo < 1) {
      adicionarErro(
        "PERIODO_INVALIDO",
        `O período ${String(periodo)} deve ser um número inteiro positivo.`,
        null,
        "periodos"
      );
      continue;
    }

    if (periodosValidos.has(periodo)) {
      adicionarErro(
        "PERIODO_DUPLICADO",
        `O período ${periodo} foi declarado mais de uma vez.`,
        String(periodo),
        "periodos"
      );
    } else {
      periodosValidos.add(periodo);
    }
  }

  resumo.periodosValidados = periodosValidos.size;

  const professorIds = criarConjuntoDeIds(professores);
  const turmaPorId = criarMapaPorId(turmas);
  const disciplinaIds = criarConjuntoDeIds(disciplinas);
  const segmentoCodigos = criarConjuntoDeCodigos(segmentos);
  const celulasPorHorario = new Set();

  for (const celula of grade) {
    resumo.celulasProcessadas += 1;

    if (!ehObjeto(celula)) {
      adicionarErro(
        "CELULA_DA_GRADE_INVALIDA",
        "Cada célula da grade deve ser um objeto.",
        null,
        "grade"
      );
      continue;
    }

    const registroId = celula.id || null;

    validarCamposObrigatoriosDaCelula(celula, adicionarErro);

    if (!professorIds.has(celula.professorId)) {
      adicionarErro(
        "PROFESSOR_INEXISTENTE",
        `O professor ${String(celula.professorId)} não existe nos dados de referência.`,
        registroId,
        "professorId"
      );
    }

    const dia = diasPorData.get(celula.data);
    if (!dia) {
      adicionarErro(
        "DATA_DA_GRADE_INVALIDA",
        `A data ${String(celula.data)} não foi declarada em diasEscolares.`,
        registroId,
        "data"
      );
    } else if (celula.diaSemana !== dia.diaSemana) {
      adicionarErro(
        "DIA_DA_SEMANA_INCOERENTE",
        `O dia da semana não corresponde à data ${celula.data}.`,
        registroId,
        "diaSemana"
      );
    }

    if (!periodosValidos.has(celula.periodo)) {
      adicionarErro(
        "PERIODO_DA_GRADE_INVALIDO",
        `O período ${String(celula.periodo)} não foi declarado em periodos.`,
        registroId,
        "periodo"
      );
    }

    const chaveHorario = `${celula.professorId}|${celula.data}|${celula.periodo}`;
    if (celulasPorHorario.has(chaveHorario)) {
      adicionarErro(
        "PROFESSOR_COM_ATIVIDADES_SIMULTANEAS",
        "O professor possui mais de uma célula no mesmo dia e período.",
        registroId,
        "periodo"
      );
    } else {
      celulasPorHorario.add(chaveHorario);
    }

    validarSituacaoECampos(celula, turmaPorId, segmentoCodigos, disciplinaIds, {
      adicionarErro,
      adicionarAviso
    });
  }

  return criarResultado(erros, avisos, resumo);
}

function validarCamposObrigatoriosDaCelula(celula, adicionarErro) {
  const camposObrigatorios = [
    "id",
    "data",
    "diaSemana",
    "periodo",
    "professorId",
    "valorOriginal",
    "situacao"
  ];

  for (const campo of camposObrigatorios) {
    const valor = celula[campo];
    const ausente =
      valor === undefined ||
      valor === null ||
      (typeof valor === "string" && valor.trim() === "");

    if (ausente) {
      adicionarErro(
        "CAMPO_DA_GRADE_AUSENTE",
        `O campo ${campo} é obrigatório na célula da grade.`,
        celula.id || null,
        campo
      );
    }

  }
}

function validarRegistrosDeReferencia(
  registros,
  tipo,
  camposTextoObrigatorios,
  camposArrayObrigatorios,
  adicionarErro
) {
  registros.forEach((registro, indice) => {
    const registroId = ehObjeto(registro) ? registro.id || null : null;

    if (!ehObjeto(registro)) {
      adicionarErro(
        "REGISTRO_DE_REFERENCIA_INVALIDO",
        `O registro ${indice} da coleção de ${tipo}s deve ser um objeto.`,
        registroId,
        tipo
      );
      return;
    }

    for (const campo of camposTextoObrigatorios) {
      if (!ehTextoNaoVazio(registro[campo])) {
        adicionarErro(
          "CAMPO_DE_REFERENCIA_AUSENTE",
          `O campo ${campo} é obrigatório no registro de ${tipo}.`,
          registroId,
          campo
        );
      }
    }

    for (const campo of camposArrayObrigatorios) {
      if (!Array.isArray(registro[campo])) {
        adicionarErro(
          "CAMPO_DE_REFERENCIA_INVALIDO",
          `O campo ${campo} deve ser um array no registro de ${tipo}.`,
          registroId,
          campo
        );
      }
    }
  });
}

function validarSituacaoECampos(
  celula,
  turmaPorId,
  segmentoCodigos,
  disciplinaIds,
  { adicionarErro, adicionarAviso }
) {
  const { situacao, valorOriginal, id: registroId } = celula;

  if (!SITUACOES_VALIDAS.has(situacao)) {
    adicionarErro(
      "SITUACAO_INVALIDA",
      `A situação ${String(situacao)} não é válida.`,
      registroId,
      "situacao"
    );
    return;
  }

  if (situacao === "AULA_REGULAR") {
    validarAulaRegular(
      celula,
      turmaPorId,
      segmentoCodigos,
      disciplinaIds,
      adicionarErro
    );
    return;
  }

  for (const campo of CAMPOS_NAO_AULA) {
    if (celula[campo] !== null) {
      adicionarErro(
        "DADO_DE_AULA_EM_CELULA_NAO_REGULAR",
        `A situação ${situacao} não deve possuir o campo ${campo} preenchido.`,
        registroId,
        campo
      );
    }
  }

  const valorEsperado = {
    HORA_ATIVIDADE: "HA",
    SEM_AULA_REGISTRADA: "----------"
  }[situacao];

  if (valorEsperado && valorOriginal !== valorEsperado) {
    adicionarErro(
      "VALOR_ORIGINAL_INCOERENTE",
      `A situação ${situacao} exige o valor original ${valorEsperado}.`,
      registroId,
      "valorOriginal"
    );
  }

  if (situacao === "VALOR_DESCONHECIDO") {
    adicionarAviso(
      "VALOR_ORIGINAL_NAO_INTERPRETADO",
      "O valor original foi preservado, mas não foi interpretado como atividade conhecida.",
      registroId,
      "valorOriginal"
    );
  }
}

function validarAulaRegular(
  celula,
  turmaPorId,
  segmentoCodigos,
  disciplinaIds,
  adicionarErro
) {
  const registroId = celula.id || null;
  const turma = turmaPorId.get(celula.turmaId);

  if (!turma) {
    adicionarErro(
      "TURMA_INEXISTENTE",
      `A turma ${String(celula.turmaId)} não existe nos dados de referência.`,
      registroId,
      "turmaId"
    );
  }

  if (!segmentoCodigos.has(celula.segmentoCodigo)) {
    adicionarErro(
      "SEGMENTO_INEXISTENTE",
      `O segmento ${String(celula.segmentoCodigo)} não existe nos dados de referência.`,
      registroId,
      "segmentoCodigo"
    );
  }

  if (!disciplinaIds.has(celula.disciplinaId)) {
    adicionarErro(
      "DISCIPLINA_INEXISTENTE",
      `A disciplina ${String(celula.disciplinaId)} não existe nos dados de referência.`,
      registroId,
      "disciplinaId"
    );
  }

  if (turma && turma.segmentoCodigo !== celula.segmentoCodigo) {
    adicionarErro(
      "SEGMENTO_DA_AULA_INCOMPATIVEL",
      "O segmento da aula não corresponde ao segmento da turma.",
      registroId,
      "segmentoCodigo"
    );
  }

  if (turma && celula.valorOriginal !== turma.codigo) {
    adicionarErro(
      "VALOR_ORIGINAL_INCOERENTE",
      "O valor original da aula não corresponde ao código da turma.",
      registroId,
      "valorOriginal"
    );
  }
}

function validarIdsUnicos(registros, codigo, tipo, adicionarErro) {
  const ids = new Set();

  for (const registro of registros) {
    if (!ehObjeto(registro) || registro.id === undefined) {
      continue;
    }

    if (ids.has(registro.id)) {
      adicionarErro(
        codigo,
        `O ID do ${tipo} ${String(registro.id)} foi declarado mais de uma vez.`,
        registro.id,
        "id"
      );
    } else {
      ids.add(registro.id);
    }
  }
}

function criarConjuntoDeIds(registros) {
  return new Set(
    registros
      .filter((registro) => ehObjeto(registro))
      .map((registro) => registro.id)
  );
}

function criarMapaPorId(registros) {
  return new Map(
    registros
      .filter((registro) => ehObjeto(registro))
      .map((registro) => [registro.id, registro])
  );
}

function criarConjuntoDeCodigos(registros) {
  return new Set(
    registros
      .filter((registro) => ehObjeto(registro))
      .map((registro) => registro.codigo)
  );
}

function criarResultado(erros, avisos, resumo) {
  return {
    valido: erros.length === 0,
    erros,
    avisos,
    resumo
  };
}

function ehObjeto(valor) {
  return valor !== null && typeof valor === "object" && !Array.isArray(valor);
}

function ehTextoNaoVazio(valor) {
  return typeof valor === "string" && valor.trim() !== "";
}

module.exports = {
  validateSchedule
};
