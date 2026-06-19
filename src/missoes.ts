import type { Database } from "sql.js";

export interface ValidacaoRetorno {
  sucesso: boolean;
  mensagemErro?: string;
}

export interface Missao {
  id: number;
  descricao: string;
  verificarSucesso: (
    query: string,
    resultados: any[],
    db: Database,
  ) => ValidacaoRetorno;
}

export interface Sprint {
  id: number;
  titulo: string;
  tutorial: string[];
  exemplo: string;
  missoes: Missao[];
}

export const sprints: Sprint[] = [
  {
    id: 1,
    titulo: "Sprint 1: Filtros e Diagnóstico",
    tutorial: [
      "Para diagnosticar os problemas da cidade, precisamos extrair os dados corretos das tabelas do sistema.",
      "Utilizamos o comando SELECT para buscar dados de colunas específicas ou de todas (*) as colunas.",
      "Utilizamos a cláusula WHERE acompanhada de operadores de igualdade (=) ou matemáticos (<, >) para filtrar os dados.",
    ],
    exemplo: "SELECT tipo, horario FROM incidentes WHERE id_setor = 4;",
    missoes: [
      {
        id: 1,
        descricao:
          "CÓDIGO VERMELHO: Identifique todos os registros na tabela de setores da metrópole que estão operando sob o status de segurança 'CRITICO'.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("SELECT") ||
            !q.includes("WHERE") ||
            !q.includes("SETORES")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Sua instrução precisa consultar a tabela 'setores' usando os comandos de busca e filtro.",
            };
          }
          if (!q.includes("'CRITICO'") && !q.includes('"CRITICO"')) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: O alvo da busca está errado. Filtre especificamente pelo status 'CRITICO'.",
            };
          }
          if (!resultados || resultados.length !== 2) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Os dados não condizem com a realidade. Verifique a sintaxe.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 2,
        descricao:
          "RASTREADOR DE AMEAÇAS: Investigue o painel de incidentes e localize o registro exato onde o tipo de ocorrência seja um 'CIBERATAQUE'.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("SELECT") ||
            !q.includes("WHERE") ||
            !q.includes("INCIDENTES")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Certifique-se de estar consultando a tabela 'incidentes'.",
            };
          }
          if (!q.includes("'CIBERATAQUE'") && !q.includes('"CIBERATAQUE"')) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: O filtro precisa buscar exatamente o termo 'CIBERATAQUE'.",
            };
          }
          if (!resultados || resultados.length !== 1) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Verifique a grafia do filtro. Deve retornar apenas o registro do ataque.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 3,
        descricao:
          "ALERTA NA REDE ELÉTRICA: Localize na tabela de reatores de energia todos os equipamentos que estão operando com a carga atual estritamente menor que 20.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("SELECT") ||
            !q.includes("ENERGIA_REATORES") ||
            !q.includes("WHERE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Você precisa consultar a tabela 'energia_reatores'.",
            };
          }
          if (!q.includes("<") || !q.includes("20")) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Utilize o operador matemático correto para achar as cargas abaixo de 20.",
            };
          }
          if (!resultados || resultados.length !== 2) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Existem exatamente 2 reatores quase sem energia. Verifique sua consulta.",
            };
          }
          return { friendship: true, sucesso: true };
        },
      },
      {
        id: 4,
        descricao:
          "LOGÍSTICA DE RESGATE: Descubra quais esquadrões estão ocupados no momento. Busque na tabela de equipes de resgate todas as unidades cuja disponibilidade conste como 'NAO'.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("SELECT") ||
            !q.includes("EQUIPES_RESGATE") ||
            !q.includes("WHERE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Consulte a tabela 'equipes_resgate' aplicando os filtros necessários.",
            };
          }
          if (!q.includes("'NAO'") && !q.includes('"NAO"')) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Filtre exatamente pelas equipes com disponibilidade 'NAO'.",
            };
          }
          if (!resultados || resultados.length !== 1) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Apenas 1 equipe está indisponível no momento. Ajuste sua busca.",
            };
          }
          return { sucesso: true };
        },
      },
    ],
  },
  {
    id: 2,
    titulo: "Sprint 2: Analisar e Agrupar",
    tutorial: [
      "Com os problemas localizados, precisamos consolidar os dados para planejar o envio de equipes.",
      "O comando ORDER BY ordena as linhas com base em um atributo. Usar DESC no fim deixa a ordem decrescente, e ASC crescente.",
      "As funções de agregação realizam cálculos em colunas inteiras, como SUM(coluna) para somar e COUNT(coluna) para contar.",
      "O comando GROUP BY é usado para agrupar linhas que têm os mesmos valores em linhas de resumo.",
    ],
    exemplo:
      "SELECT COUNT(*), status_seguranca FROM setores GROUP BY status_seguranca;",
    missoes: [
      {
        id: 1,
        descricao:
          "TRIAGEM DE EMERGÊNCIA: Encontre os setores em estado 'CRITICO' e organize a lista de resultados mostrando primeiro os distritos com a maior população.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (!q.includes("ORDER BY") || !q.includes("DESC")) {
            return {
              sucesso: false,
              mensagemErro:
                "Falha na priorização. O sistema não detectou a ordenação do maior para o menor.",
            };
          }
          if (
            !resultados ||
            resultados.length !== 2 ||
            resultados[0][0] !== 4
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: A ordenação falhou. O setor mais populoso (Submundo Neon) deve vir no topo.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 2,
        descricao:
          "CONTAGEM DE VÍTIMAS: Calcule a população total acumulada somando os habitantes apenas dos setores que se encontram em estado 'CRITICO'.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (!q.includes("SUM") || !q.includes("POPULACAO")) {
            return {
              sucesso: false,
              mensagemErro:
                "Análise incompleta: Utilize a função de agregação de soma matemática na população.",
            };
          }
          if (
            !resultados ||
            resultados.length === 0 ||
            resultados[0][0] !== 44000
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: O cálculo não bateu. Garanta que está somando apenas a população dos setores críticos.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 3,
        descricao:
          "CORRIDA CONTRA O TEMPO: Identifique qual reator vai apagar primeiro. Liste todos os registros da tabela de reatores ordenando pela carga atual do menor para o maior.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (!q.includes("ORDER BY") || !q.includes("CARGA_ATUAL")) {
            return {
              sucesso: false,
              mensagemErro:
                "Falha na priorização: Você esqueceu de ordenar a coluna de carga.",
            };
          }
          if (
            !resultados ||
            resultados.length !== 4 ||
            resultados[0][0] !== 4
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: A ordenação não está correta. O reator com a menor carga deve aparecer na primeira linha.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 4,
        descricao:
          "MAPEAMENTO TÁTICO: Conte quantas equipes de resgate existem para cada tipo de especialidade, agrupando os resultados de acordo com essas especialidades.",
        verificarSucesso: (query, resultados, _db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("COUNT") ||
            !q.includes("GROUP BY") ||
            !q.includes("ESPECIALIDADE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Análise incompleta: É obrigatório o uso da função de contagem agrupada pela coluna especialidade.",
            };
          }
          if (!resultados || resultados.length < 3) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: O agrupamento falhou. Certifique-se de referenciar a tabela de equipes.",
            };
          }
          return { sucesso: true };
        },
      },
    ],
  },
  {
    id: 3,
    titulo: "Sprint 3: Intervir e Solucionar",
    tutorial: [
      "Hora de agir. Para modificar o estado do banco de dados, usamos comandos de manipulação.",
      "O comando UPDATE altera valores de registros existentes. O comando DELETE FROM remove registros permanentemente.",
      "Para cadastrar novos dados, usamos o INSERT INTO tabela (coluna1, coluna2) VALUES (valor1, valor2).",
    ],
    exemplo:
      "INSERT INTO incidentes (id_incidente, id_setor, tipo) VALUES (99, 1, 'INVASAO');",
    missoes: [
      {
        id: 1,
        descricao:
          "RESTAURAÇÃO DA PAZ: Modifique o status de segurança dos setores para 'ESTAVEL', garantindo que essa alteração afete exclusivamente os locais que atualmente se encontram 'CRITICOS'.",
        verificarSucesso: (query, _resultados, db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("UPDATE") ||
            !q.includes("SET") ||
            !q.includes("WHERE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Alerta de Segurança: Você precisa atualizar a tabela e determinar o filtro para não afetar os locais errados.",
            };
          }
          try {
            const check = db.exec(
              "SELECT * FROM setores WHERE status_seguranca = 'CRITICO';",
            );
            if (check.length > 0 && check[0].values.length > 0) {
              return {
                sucesso: false,
                mensagemErro:
                  "Aviso: A intervenção falhou. Setores ainda continuam em estado crítico.",
              };
            }
          } catch (e) {
            return {
              sucesso: false,
              mensagemErro: "Erro de validação no banco.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 2,
        descricao:
          "LIMPEZA DE SISTEMA: Os sistemas foram limpos. Remova permanentemente da tabela de incidentes todos os registros em que o tipo seja igual a 'CIBERATAQUE'.",
        verificarSucesso: (query, _resultados, db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("DELETE") ||
            !q.includes("FROM") ||
            !q.includes("WHERE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Utilize a sintaxe de remoção de dados protegida por um filtro condicional.",
            };
          }
          try {
            const check = db.exec(
              "SELECT * FROM incidentes WHERE tipo = 'CIBERATAQUE';",
            );
            if (check.length > 0 && check[0].values.length > 0) {
              return {
                sucesso: false,
                mensagemErro:
                  "Aviso: O ciberataque ainda consta nos registros do painel de incidentes.",
              };
            }
          } catch (e) {
            return {
              sucesso: false,
              mensagemErro: "Erro de validação no banco.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 3,
        descricao:
          "REFORÇOS A CAMINHO: Insira uma nova equipe na tabela de equipes de resgate contendo sequencialmente os dados: id 4, especialidade 'MEDICA', no setor 4, com disponibilidade 'SIM'.",
        verificarSucesso: (query, _resultados, db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("INSERT INTO") ||
            !q.includes("EQUIPES_RESGATE") ||
            !q.includes("VALUES")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: O sistema exige o comando de inserção de valores para registrar a equipe.",
            };
          }
          try {
            const check = db.exec(
              "SELECT * FROM equipes_resgate WHERE id_equipe = 4 AND especialidade = 'MEDICA';",
            );
            if (check.length === 0 || check[0].values.length === 0) {
              return {
                sucesso: false,
                mensagemErro:
                  "Aviso: A equipe não foi encontrada no banco de dados. Verifique a ordem dos valores informados.",
              };
            }
          } catch (e) {
            return {
              sucesso: false,
              mensagemErro: "Erro de validação no banco.",
            };
          }
          return { sucesso: true };
        },
      },
      {
        id: 4,
        descricao:
          "PREVENÇÃO DE APAGÃO: Evite a queda total! Atualize a tabela de reatores mudando a carga atual para 100 e o status de operação para 'NORMAL' naqueles reatores cuja carga seja menor que 20.",
        verificarSucesso: (query, _resultados, db) => {
          const q = query.toUpperCase();
          if (
            !q.includes("UPDATE") ||
            !q.includes("SET") ||
            !q.includes("WHERE")
          ) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Modifique os dados utilizando filtros focados nas baterias descarregadas.",
            };
          }
          if (!q.includes("100") || !q.includes("NORMAL")) {
            return {
              sucesso: false,
              mensagemErro:
                "Aviso: Você deve restaurar a carga máxima (100) e o status correto.",
            };
          }
          try {
            const check = db.exec(
              "SELECT * FROM energia_reatores WHERE carga_atual < 20;",
            );
            if (check.length > 0 && check[0].values.length > 0) {
              return {
                sucesso: false,
                mensagemErro:
                  "Aviso: Ainda existem reatores no limite de energia. A intervenção falhou.",
              };
            }
          } catch (e) {
            return {
              sucesso: false,
              mensagemErro: "Erro de validação no banco.",
            };
          }
          return { sucesso: true };
        },
      },
    ],
  },
];
