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

O sistema não deverá ser fixo em um único segmento.

A busca deverá começar pelo segmento do professor faltante, esgotando as possibilidades válidas desse segmento antes de recorrer a outros.

Exemplos:

- Falta nos Anos Finais: começar pelos Anos Finais.
- Falta no Ensino Médio: começar pelo Ensino Médio.
- Falta nos Anos Iniciais: começar pelos Anos Iniciais.

A ordem de busca dos demais segmentos deverá ser configurável conforme as prioridades definidas pela escola.

Professores de outros segmentos não deverão ser utilizados enquanto ainda existirem possibilidades válidas no segmento original.

A prioridade do segmento deverá ser respeitada antes da otimização da quantidade de períodos cobertos.

## 5. Regras especiais dos Anos Iniciais

Os professores dos Anos Iniciais possuem uma característica específica: são responsáveis por uma turma e possuem uma grade completa de turno.

Por isso:

1. Não podem ser considerados disponíveis apenas porque possuem alguns horários vagos.
2. Precisam estar liberados de suas responsabilidades com a própria turma durante todo o período necessário.
3. Só poderão ser considerados para substituição se puderem assumir pelo menos dois períodos.
4. Os dois ou mais períodos podem ser distribuídos entre diferentes turmas e substituições no mesmo turno.
5. Não poderão ser indicados para cobrir somente um período.

A verificação deverá considerar a situação da turma pela qual o professor é responsável e a disponibilidade real de todo o turno necessário.

## 6. Disponibilidade e elegibilidade

Para ser recomendado, o professor deverá:

- Estar autorizado para o segmento e a disciplina da substituição, conforme as regras de autorização da escola.
- Estar disponível no período solicitado.
- Não possuir outra substituição confirmada no mesmo horário.
- Não possuir conflito com outra aula ou compromisso registrado.
- Não ter recusado aquela mesma substituição naquele período.

A disponibilidade deverá ser analisada considerando a grade completa do dia, e não somente o período isolado.

## 7. Prioridade dos candidatos dentro do segmento

Dentro do segmento prioritário, deverão ser considerados:

1. Professores com HA no período necessário.
2. Professores livres no período, independentemente de possuírem HA.
3. Professores livres no período e que possuam aulas em outros horários do mesmo dia.

A aplicação desses níveis deverá respeitar as autorizações e demais restrições.

**Observação:** os níveis 2 e 3 ainda precisam de refinamento, pois podem se sobrepor. A distinção exata deverá ser validada antes da implementação definitiva.

## 8. Quantidade mínima de períodos

Quando professores de outros segmentos forem utilizados, deverá ser respeitada a regra de cobertura mínima de dois períodos.

Para professores dos Anos Iniciais, aplica-se adicionalmente a regra especial da seção 5: disponibilidade de todo o período necessário e liberação das responsabilidades com a própria turma.

Os períodos mínimos podem ser distribuídos entre diferentes turmas, desde que não existam conflitos.

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

## 10. Critérios de otimização

Após respeitar as prioridades e restrições obrigatórias, o sistema deverá utilizar a seguinte ordem de otimização:

1. **Prioridade do segmento original:** esgotar primeiro as possibilidades válidas do segmento do professor faltante.
2. **Maior cobertura:** maximizar a quantidade total de períodos cobertos.
3. **Grades completas:** entre soluções que cobrem a mesma quantidade de períodos, preferir aquela que deixa mais professores faltantes com suas grades totalmente cobertas.
4. **Menos substitutos:** persistindo o empate, preferir a solução que utiliza menos professores substitutos.
5. **Proximidade das disciplinas:** persistindo o empate, preferir a combinação com maior compatibilidade entre as disciplinas dos substitutos e a disciplina do professor faltante.
6. **Alternância:** se ainda houver empate, alternar as recomendações entre os professores igualmente qualificados.

A prioridade de segmento não poderá ser ignorada apenas para obter uma cobertura maior utilizando outro segmento.

## 11. Proximidade entre disciplinas

A proximidade entre disciplinas será utilizada como critério de desempate, nunca como substituta da autorização.

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

Quando dois ou mais professores apresentarem exatamente as mesmas condições de elegibilidade e prioridade, o sistema deverá alternar as recomendações.

Objetivos:

- Evitar favorecer sempre os mesmos professores.
- Distribuir melhor as oportunidades.
- Considerar o histórico de recomendações.

A alternância nunca deverá superar critérios mais importantes, como autorização, disponibilidade ou prioridade de segmento.

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
- Ignorar recusas ainda válidas.
- Utilizar professores de outros segmentos antes de esgotar as possibilidades válidas do segmento original.

## 17. Pontos ainda pendentes de definição

Antes da implementação definitiva, deverão ser esclarecidos:

1. A ordem de prioridade dos segmentos secundários para cada segmento original.
2. A distinção exata entre os níveis 2 e 3 de prioridade dos candidatos.
3. Como a regra de dois períodos mínimos de professores de outros segmentos será aplicada em situações de múltiplas faltas simultâneas.
4. Como o sistema deverá tratar situações em que uma professora dos Anos Iniciais esteja liberada de sua turma, mas somente parte do turno esteja disponível.
5. Como será calculada a alternância das recomendações e qual período de histórico será considerado.

---

**Princípio geral:** o sistema deverá apoiar a decisão do coordenador, oferecendo sugestões justificadas, respeitando as regras da escola e impedindo conflitos de horários. Nenhuma sugestão deverá ser tratada como substituição confirmada antes da aceitação e do registro correspondente.