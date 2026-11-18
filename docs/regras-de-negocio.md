# Sistema Inteligente de Substituição de Professores
## Regras de negócio

**Versão:** 3.0  
**Status:** Em definição e validação

## 1. Objetivo do sistema

Desenvolver um sistema capaz de analisar os horários dos professores, identificar as aulas que precisam de substituição e sugerir a melhor distribuição possível de professores substitutos.

O sistema deverá:

- Importar arquivos de horários exportados pelo Urânia (`.xlsx` ou `.csv`).
- Analisar um ou vários dias.
- Identificar as aulas dos professores faltantes.
- Encontrar professores elegíveis para substituição.
- Analisar faltas simultâneas em conjunto.
- Sugerir a melhor combinação de substitutos.
- Registrar aceitações e recusas.
- Recalcular as sugestões conforme as respostas dos professores.

Na primeira versão, o sistema será uma ferramenta de apoio à decisão. O coordenador continuará responsável por entrar em contato com os professores e confirmar as substituições.

## 2. Segmentos escolares

O sistema deverá trabalhar com quatro segmentos:

- Educação Infantil.
- Anos Iniciais.
- Anos Finais.
- Ensino Médio.

Deverá diferenciar três informações de cada professor:

- Segmentos em que atua normalmente.
- Segmentos em que está autorizado a atuar.
- Disciplinas para as quais está autorizado.

A autorização é obrigatória. A proximidade entre disciplinas não concede autorização para substituição.

## 3. Interpretação dos horários

O sistema deverá reconhecer as seguintes situações:

- `AULA_REGULAR`: professor possui aula registrada.
- `HORA_ATIVIDADE`: professor possui hora-atividade (HA).
- `SEM_AULA_REGISTRADA`: não existe aula registrada naquele horário.
- `VALOR_DESCONHECIDO`: informação que não pôde ser interpretada.

Regras:

- HA é um indicador de possível disponibilidade, não uma confirmação.
- A ausência de aula registrada não significa disponibilidade garantida.
- O coordenador deverá confirmar a disponibilidade antes de efetivar a substituição.

## 4. Prioridade entre segmentos

O sistema deverá determinar o segmento da turma que precisa de substituição. A busca deverá começar por professores que atuam normalmente nesse segmento, esgotando os candidatos elegíveis antes de recorrer a professores de outros segmentos.

Para turmas dos segmentos abaixo, a ordem de busca será:

- **Ensino Médio:** Ensino Médio → Anos Finais → Anos Iniciais.
- **Anos Finais:** Anos Finais → Ensino Médio → Anos Iniciais.
- **Anos Iniciais:** Anos Iniciais → Anos Finais → Ensino Médio.
- **Educação Infantil:** buscar somente dentro da própria Educação Infantil.

Para turmas dos demais segmentos, a Educação Infantil será um recurso excepcional de emergência, considerado somente depois de esgotadas as alternativas normais listadas para o segmento da turma. Cada indicação da Educação Infantil nessa condição deverá gerar um aviso ao coordenador, identificando explicitamente que se trata de uma alternativa emergencial. Os professores também deverão estar autorizados para atuar na turma e atender aos demais critérios.

Em cada segmento da ordem de busca, o sistema deverá esgotar a prioridade atual de candidatos antes de passar à seguinte. Só deverá avançar para o próximo segmento quando não houver mais candidatos elegíveis no segmento pesquisado. A ordem de segmentos e de prioridades deverá ser respeitada antes da otimização da quantidade de períodos cobertos.

## 5. Regras especiais dos Anos Iniciais

Os professores dos Anos Iniciais possuem uma característica específica: são responsáveis por uma turma e possuem uma grade completa de turno.

Por isso:

1. Não podem ser considerados disponíveis apenas porque possuem alguns horários vagos.
2. Só poderão ser considerados nos períodos em que estiverem explicitamente liberados de suas responsabilidades com a própria turma. A liberação de parte do turno não deverá ser interpretada como liberação do turno inteiro.
3. Só poderão ser considerados para substituição se puderem assumir pelo menos dois períodos.
4. Os dois ou mais períodos podem ser não consecutivos e distribuídos entre diferentes turmas e substituições no mesmo turno, desde que cada período esteja explicitamente liberado da responsabilidade do professor com sua própria turma.
5. Não poderão ser indicados para cobrir somente um período.

A verificação deverá considerar a situação da turma pela qual o professor é responsável e a disponibilidade real de cada período proposto.

## 6. Disponibilidade e elegibilidade

Para ser recomendado, o professor deverá:

- Estar autorizado para o segmento e a disciplina da substituição, conforme as regras de autorização da escola.
- Não possuir aula ou compromisso conhecido no período solicitado e ter a disponibilidade real confirmada pelo coordenador antes da efetivação.
- Não possuir outra substituição confirmada no mesmo horário.
- Não possuir conflito com outra aula ou compromisso registrado.
- Não ter recusado aquela mesma substituição naquele período.

A disponibilidade deverá ser analisada considerando a grade do dia e o período exato. HA é um indicador para ordenar candidatos, não confirmação de disponibilidade. A situação `----------` significa somente que não há aula registrada naquele período; não confirma que o professor esteja disponível.

A inclusão provisória de candidatos cujo período exato esteja marcado como `----------` deverá permanecer desativada por padrão. Só poderá ser habilitada por uma regra explícita da escola, e a lista deverá identificar que a disponibilidade precisa ser verificada pelo coordenador.

## 7. Prioridade dos candidatos

Antes de aplicar as prioridades abaixo, o sistema deverá verificar autorização para o segmento e a disciplina, conflitos e as demais restrições obrigatórias.

Para cada segmento pesquisado, deverão ser esgotadas as prioridades nesta ordem:

1. **Prioridade 1 — HA no período exato:** professor que atua normalmente no segmento pesquisado, está autorizado para a turma e possui HA exatamente no período da substituição. HA não confirma a disponibilidade real; o coordenador deverá contatar o professor e registrar a resposta.
2. **Prioridade 2 — atividade em outro período do dia:** professor livre no período da substituição, com aula ou HA registrada em outro período daquele mesmo dia. A disponibilidade real deverá ser verificada pelo coordenador.
3. **Prioridade 3 — nenhuma atividade escolar no dia:** professor livre no período da substituição e cuja ausência de atividades escolares naquele dia esteja efetivamente confirmada. Só poderá ser considerado se assumir pelo menos dois períodos de substituição no dia; esses períodos podem ser em turmas diferentes e não consecutivos.

Em qualquer prioridade, a grade não confirma a disponibilidade real. O coordenador deverá contatar os candidatos em ordem: os candidatos seguintes da mesma prioridade só deverão ser contatados se o anterior recusar ou não estiver disponível. Quando um professor aceitar, o período deverá ser reservado imediatamente e o sistema deverá recalcular as demais atribuições. A prioridade seguinte só deverá ser consultada quando não houver candidato viável na prioridade atual.

Um período `----------` não comprova que o professor esteja disponível nem que não tenha outras atividades; portanto, não confirma a ausência de atividades exigida pela prioridade 3 e não deverá incluí-lo automaticamente nas prioridades 2 ou 3. Isso não impede que o professor seja considerado posteriormente, caso o coordenador confirme sua disponibilidade real e ele satisfaça os critérios da prioridade aplicável. O sistema não poderá confirmar essa disponibilidade automaticamente. Enquanto a disponibilidade permanecer desconhecida, a inclusão provisória só poderá ocorrer se uma regra explícita da escola estiver habilitada, com aviso de que o coordenador precisa verificá-la.

## 8. Quantidade mínima de períodos

Um candidato da prioridade 3 cuja ausência de atividades escolares naquele dia esteja confirmada deverá ser considerado somente se puder assumir pelo menos dois períodos de substituição naquele dia. A ausência de aula registrada (`----------`) não basta para concluir que o professor não possui atividades.

Para professores dos Anos Iniciais, aplica-se adicionalmente a regra especial da seção 5: somente os períodos explicitamente liberados da responsabilidade com a própria turma poderão ser considerados.

Os dois ou mais períodos podem ser distribuídos entre diferentes turmas e não precisam ser consecutivos, desde que não existam conflitos.

## 9. Análise de faltas simultâneas

Todas as faltas de um mesmo dia deverão ser analisadas em conjunto.

O sistema não deverá resolver uma falta isoladamente e somente depois tentar resolver a próxima.

Deverá procurar uma distribuição global que:

- Respeite a prioridade de segmento de cada professor faltante.
- Evite conflitos de horários.
- Aproveite melhor os professores disponíveis.
- Maximize a cobertura das aulas.
- Evite prejudicar uma substituição para favorecer outra sem necessidade.

A ordem em que o coordenador cadastrar as faltas não deverá determinar o resultado.

Em faltas simultâneas, os períodos de substituição atribuídos ao mesmo professor deverão ser contabilizados em conjunto no total das substituições daquele dia. Contam-se os períodos distintos; um mesmo período não poderá ser contado mais de uma vez nem gerar atribuições simultâneas para o professor. A regra mínima da prioridade 3 será verificada sobre esse conjunto diário.

## 10. Critérios de otimização

Após respeitar as prioridades e restrições obrigatórias, o sistema deverá utilizar a seguinte ordem de otimização:

1. **Ordem de busca de segmentos e candidatos:** respeitar a ordem definida na seção 4 e esgotar as prioridades de candidatos definidas na seção 7 antes de avançar.
2. **Maior cobertura:** maximizar a quantidade total de períodos cobertos.
3. **Grades completas:** entre soluções que cobrem a mesma quantidade de períodos, preferir aquela que deixa mais professores faltantes com suas grades totalmente cobertas.
4. **Menos substitutos:** persistindo o empate, preferir a solução que utiliza menos professores substitutos.
5. **Proximidade de conteúdo:** entre candidatos igualmente qualificados, considerar a proximidade entre os conteúdos das disciplinas quando relevante. Esse critério é complementar e nunca substitui a autorização exigida.
6. **Alternância:** persistindo o empate, priorizar o professor que recebeu menos indicações nos últimos 30 dias.

A prioridade de segmento não poderá ser ignorada apenas para obter uma cobertura maior utilizando outro segmento.

## 11. Proximidade de conteúdo

A proximidade de conteúdo entre disciplinas será utilizada como critério complementar de desempate, nunca como substituta da autorização.

Tabela provisória:

| Disciplina faltante | Disciplinas relacionadas |
|---|---|
| Geografia | História, Sociologia, Filosofia |
| História | Geografia, Sociologia, Filosofia |
| Matemática | Física, Química |
| Física | Matemática, Química, Ciências |
| Química | Física, Biologia, Ciências |
| Biologia | Ciências, Química |
| Ciências | Biologia, Física, Química |
| Português | Literatura, Redação |
| Literatura | Português, Redação |
| Redação | Português, Literatura |
| Filosofia | Sociologia, História |
| Sociologia | Filosofia, História |

Essa tabela é provisória e deverá ser configurável, permitindo alterações conforme a realidade da escola.

## 12. Alternância de recomendações

Quando dois ou mais professores apresentarem exatamente as mesmas condições de elegibilidade e prioridade, a alternância será baseada no histórico dos últimos 30 dias. Depois de considerar a proximidade de conteúdo quando relevante, deverá ser priorizado quem recebeu menos indicações nesse período.

Objetivos:

- Evitar favorecer sempre os mesmos professores.
- Distribuir melhor as oportunidades.
- Considerar o histórico de recomendações.

A alternância nunca deverá superar critérios mais importantes, como autorização, disponibilidade, prioridade de candidato ou ordem de busca do segmento.

## 13. Aceitação e recusa

O coordenador deverá registrar a resposta do professor para cada período oferecido.

### Aceitação

- O período aceito será imediatamente reservado.
- O professor não poderá ser recomendado para outra substituição no mesmo dia e horário.
- A reserva deverá valer independentemente do segmento e da turma.

### Recusa

- A recusa deverá ser registrada individualmente por período.
- O professor não deverá ser recomendado novamente para aquela mesma falta, data e período.
- A recusa de um período não impedirá sua participação em outros períodos.
- O sistema deverá recalcular as possibilidades após a recusa.

### Sem resposta

A ausência de resposta deverá permanecer como pendente.

Não poderá ser interpretada como aceitação nem como recusa.

## 14. Histórico de recusas

As recusas deverão permanecer registradas mesmo se uma falta for cancelada e cadastrada novamente.

A identificação da recusa deverá considerar:

- Professor substituto.
- Professor faltante.
- Data.
- Período.

Uma recusa não deverá prejudicar futuras substituições em outros dias ou horários.

O coordenador poderá revisar manualmente uma recusa caso a situação tenha mudado.

## 15. Recalcular as sugestões

O sistema deverá recalcular as recomendações sempre que ocorrer:

- Aceitação de um ou mais períodos.
- Recusa de um ou mais períodos.
- Alteração da disponibilidade.
- Inclusão ou cancelamento de uma falta.
- Alteração de uma substituição confirmada.

O novo cálculo deverá respeitar as reservas, recusas e demais restrições já registradas.

## 16. Restrições obrigatórias

O sistema nunca deverá:

- Recomendar um professor sem autorização.
- Recomendar um professor em horário ocupado por outra aula ou substituição confirmada.
- Atribuir duas turmas ao mesmo professor no mesmo dia e período.
- Interpretar HA como disponibilidade confirmada.
- Interpretar ausência de aula registrada como disponibilidade garantida.
- Tratar `----------` como disponibilidade confirmada ou incluí-lo automaticamente na prioridade 2.
- Ignorar recusas ainda válidas.
- Utilizar professores de outros segmentos antes de esgotar as possibilidades válidas do segmento original.
- Utilizar a Educação Infantil como opção regular antes de esgotar os demais segmentos autorizados.

## 17. Pontos ainda pendentes de definição

A tabela de proximidade de conteúdo da seção 11 permanece provisória e deverá ser validada e configurada conforme a realidade da escola.

---

**Princípio geral:** o sistema deverá apoiar a decisão do coordenador, oferecendo sugestões justificadas, respeitando as regras da escola e impedindo conflitos de horários. Nenhuma sugestão deverá ser tratada como substituição confirmada antes da aceitação e do registro correspondente.