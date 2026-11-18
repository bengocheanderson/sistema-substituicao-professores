const test = require("node:test");
const assert = require("node:assert/strict");

const referenceData = require("../src/data/sampleData");
const sampleSchedule = require("../src/data/sampleSchedule");
const { validateSchedule } = require("../src/validators/scheduleValidator");

function copiarGrade(celulas = sampleSchedule.grade) {
  return {
    ...sampleSchedule,
    diasEscolares: sampleSchedule.diasEscolares.map((dia) => ({ ...dia })),
    periodos: [...sampleSchedule.periodos],
    grade: celulas.map((celula) => ({ ...celula }))
  };
}

test("valida a grade original", () => {
  const resultado = validateSchedule(copiarGrade(), referenceData);

  assert.equal(resultado.valido, true);
  assert.deepEqual(resultado.erros, []);
  assert.equal(resultado.resumo.celulasProcessadas, 30);
});

test("identifica professor inexistente", () => {
  const grade = copiarGrade();
  grade.grade = grade.grade.map((celula) =>
    celula.id === "grade-001"
      ? { ...celula, professorId: "prof-inexistente" }
      : celula
  );

  const resultado = validateSchedule(grade, referenceData);

  assert.equal(resultado.valido, false);
  assert.ok(
    resultado.erros.some(
      (erro) => erro.codigo === "PROFESSOR_INEXISTENTE"
    )
  );
});

test("identifica duas aulas do mesmo professor no mesmo dia e período", () => {
  const grade = copiarGrade();
  const aulaDaAna = grade.grade.find(
    (celula) => celula.id === "grade-007"
  );

  grade.grade.push({
    ...aulaDaAna,
    id: "grade-conflito",
    valorOriginal: "2EM-A",
    turmaId: "turma-2a-em",
    segmentoCodigo: "ENSINO_MEDIO"
  });

  const resultado = validateSchedule(grade, referenceData);

  assert.equal(resultado.valido, false);
  assert.ok(
    resultado.erros.some(
      (erro) =>
        erro.codigo === "PROFESSOR_COM_ATIVIDADES_SIMULTANEAS" &&
        erro.registroId === "grade-conflito"
    )
  );
});

test("identifica turma inexistente", () => {
  const grade = copiarGrade();
  grade.grade = grade.grade.map((celula) =>
    celula.id === "grade-001"
      ? { ...celula, turmaId: "turma-inexistente" }
      : celula
  );

  const resultado = validateSchedule(grade, referenceData);

  assert.equal(resultado.valido, false);
  assert.ok(
    resultado.erros.some((erro) => erro.codigo === "TURMA_INEXISTENTE")
  );
});

test("valida uma grade com somente um dia", () => {
  const primeiroDia = sampleSchedule.diasEscolares[0];
  const gradeDeUmDia = copiarGrade(
    sampleSchedule.grade.filter((celula) => celula.data === primeiroDia.data)
  );
  gradeDeUmDia.diasEscolares = [{ ...primeiroDia }];

  const resultado = validateSchedule(gradeDeUmDia, referenceData);

  assert.equal(resultado.valido, true);
  assert.deepEqual(resultado.erros, []);
  assert.equal(resultado.resumo.diasValidados, 1);
});
