import { useState, useEffect } from "react";
import initSqlJs from "sql.js";
import type { Database } from "sql.js";
import sqlWasmUrl from "sql.js/dist/sql-wasm.wasm?url";
import { sprints } from "./missoes";
import type { Setor, QueryResultData } from "./types";
import { neonTheme } from "./theme";
import MenuPrincipal from "./components/MenuPrincipal";
import MapaHolografico from "./components/MapaHolografico";
import ModalResultado from "./components/ModalResultado";
import DicionarioDados from "./components/DicionarioDados";

import {
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";

export default function App() {
  // Estados do Banco de Dados
  const [db, setDb] = useState<Database | null>(null);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [query, setQuery] = useState<string>("");
  const [output, setOutput] = useState<string>("Sistema online.");
  const [queryResult, setQueryResult] = useState<QueryResultData | null>(null);

  // Estados de Controle de Tela e Gamificação
  const [telaAtual, setTelaAtual] = useState<"MENU" | "JOGO">("MENU");
  const [sprintAtualId, setSprintAtualId] = useState<number>(1);
  const [missoesConcluidas, setMissoesConcluidas] = useState<number[]>([]);
  const [sprintConcluida, setSprintConcluida] = useState<boolean>(false);

  // Modais de Controle
  const [modalIntroAberto, setModalIntroAberto] = useState<boolean>(false);
  const [modalAberto, setModalAberto] = useState<boolean>(false);
  const [modalResultadoAberto, setModalResultadoAberto] =
    useState<boolean>(false);

  const sprintAtual = sprints.find((s) => s.id === sprintAtualId);

  // Inicialização do Banco de Dados
  useEffect(() => {
    const initDB = async () => {
      try {
        const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });
        const database = new SQL.Database();

        database.run(
          `CREATE TABLE setores (id_setor INTEGER PRIMARY KEY, nome_distrito TEXT, zona TEXT, status_seguranca TEXT, populacao INTEGER);`,
        );
        database.run(
          `CREATE TABLE incidentes (id_incidente INTEGER PRIMARY KEY, id_setor INTEGER, tipo TEXT, horario TEXT);`,
        );
        database.run(
          `CREATE TABLE energia_reatores (id_reator INTEGER PRIMARY KEY, id_setor INTEGER, carga_atual INTEGER, status_operacao TEXT);`,
        );
        database.run(
          `CREATE TABLE equipes_resgate (id_equipe INTEGER PRIMARY KEY, especialidade TEXT, id_setor_atual INTEGER, disponivel TEXT);`,
        );

        database.run(
          `INSERT INTO setores VALUES (1, 'Neo-Centro', 'Central', 'ESTAVEL', 50000), (2, 'Distrito Industrial 7', 'Sul', 'CRITICO', 12000), (3, 'Nível Superior', 'Norte', 'ESTAVEL', 8500), (4, 'Japantown', 'Leste', 'CRITICO', 32000);`,
        );
        database.run(
          `INSERT INTO incidentes VALUES (1, 2, 'FALHA DE ENERGIA', '22:15'), (2, 4, 'CIBERATAQUE', '23:40'), (3, 4, 'VAZAMENTO QUIMICO', '01:10');`,
        );
        database.run(
          `INSERT INTO energia_reatores VALUES (1, 1, 95, 'NORMAL'), (2, 2, 15, 'SOBRECARGA'), (3, 3, 88, 'NORMAL'), (4, 4, 10, 'FALHA');`,
        );
        database.run(
          `INSERT INTO equipes_resgate VALUES (1, 'CIBERSEGURANÇA', 1, 'SIM'), (2, 'ENGENHARIA', 3, 'SIM'), (3, 'CONTROLE DE DISTURBIOS', 1, 'NAO');`,
        );

        setDb(database);
        atualizarMapa(database);
      } catch (err: any) {
        setOutput(`Erro crítico no motor de dados: ${err.message}`);
      }
    };
    initDB();
  }, []);

  const atualizarMapa = (database: Database) => {
    try {
      const res = database.exec("SELECT * FROM setores;");
      if (res.length > 0) {
        const columns = res[0].columns;
        const setoresFormatados = res[0].values.map((row) => {
          let obj: any = {};
          columns.forEach((col, index) => {
            obj[col] = row[index];
          });
          return obj as Setor;
        });
        setSetores(setoresFormatados);
      }
    } catch (err) {}
  };

  // Funções de Navegação
  const iniciarJogo = () => {
    setTelaAtual("JOGO");
    setModalIntroAberto(false);
    setModalAberto(true);
    setOutput("Consulte o 'Manual' e siga as missões.");
  };
  const voltarAoMenu = () => {
    setTelaAtual("MENU");
    setSprintAtualId(1);
    setMissoesConcluidas([]);
    setSprintConcluida(false);
    setQuery("");
  };

  const avancarSprint = () => {
    if (sprintAtualId < sprints.length) {
      setSprintAtualId(sprintAtualId + 1);
      setMissoesConcluidas([]);
      setSprintConcluida(false);
      setQuery("");
      setQueryResult(null);
      setModalResultadoAberto(false);
      setModalAberto(true);
      setOutput("Novo módulo carregado.");
    } else {
      setSprintAtualId(99);
      setQueryResult(null);
      setModalResultadoAberto(false);
      setSprintConcluida(false);
      setOutput("🏆 PARABÉNS! A metrópole foi salva.");
    }
  };

  // Motor de Execução SQL e Gamificação
  const handleExecuteSQL = () => {
    if (!db || !sprintAtual) return;
    setQueryResult(null);
    setModalResultadoAberto(false);

    try {
      let resultados: any[] = [];
      const upperQuery = query.toUpperCase();

      if (
        upperQuery.includes("UPDATE") ||
        upperQuery.includes("INSERT") ||
        upperQuery.includes("DELETE")
      ) {
        db.run(query);
        atualizarMapa(db);
        setOutput(
          "Comando de manipulação executado com sucesso no Banco de Dados.",
        );
      } else {
        const res = db.exec(query);
        if (res.length > 0) {
          resultados = res[0].values;
          setQueryResult({ columns: res[0].columns, values: res[0].values });
          setModalResultadoAberto(true);
          setOutput(
            "Varredura concluída. Dados enviados para o painel holográfico.",
          );
        } else {
          setOutput("A consulta não retornou registros.");
        }
      }

      const missoesPendentes = sprintAtual.missoes.filter(
        (m) => !missoesConcluidas.includes(m.id),
      );
      let missaoResolvida: (typeof sprintAtual.missoes)[0] | null = null;
      let erroParaMostrar = "";

      for (const missao of missoesPendentes) {
        const validacao = missao.verificarSucesso(query, resultados, db);
        if (validacao.sucesso) {
          missaoResolvida = missao;
          break;
        } else if (!erroParaMostrar) {
          erroParaMostrar = validacao.mensagemErro || "Comando inválido.";
        }
      }

      if (missaoResolvida) {
        const novasConcluidas = [...missoesConcluidas, missaoResolvida.id];
        setMissoesConcluidas(novasConcluidas);
        let msgSucesso = `✅ SUCESSO! Ação validada pelo sistema central.`;
        if (novasConcluidas.length === sprintAtual.missoes.length) {
          setSprintConcluida(true);
          msgSucesso += `\n[SISTEMA]: Todas as missões foram cumpridas!`;
        }
        setOutput(msgSucesso);
      } else if (missoesPendentes.length > 0) {
        setOutput(`❌ ${erroParaMostrar}`);
      }
    } catch (error: any) {
      setOutput(`❌ ERRO DE SINTAXE: ${error.message}`);
    }
  };

  return (
    <ThemeProvider theme={neonTheme}>
      <CssBaseline />

      {telaAtual === "MENU" ? (
        <MenuPrincipal
          onIniciar={iniciarJogo}
          onAbrirInfo={() => setModalIntroAberto(true)}
        />
      ) : (
        <Box sx={{ p: 3, height: "100vh", display: "flex", gap: 3 }}>
          {/* COLUNA ESQUERDA: JOGO */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                color="primary"
                sx={{
                  textTransform: "uppercase",
                  textShadow: "0 0 10px #66fcf1",
                  letterSpacing: 4,
                }}
              >
                neonCity
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={voltarAoMenu}
                  sx={{ fontWeight: "bold"}}
                  
                >
                  Sair
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setModalAberto(true)}
                  sx={{ fontWeight: "bold", color: "#000" }}
                >
                  📖 Manual
                </Button>
              </Box>
            </Box>

            <MapaHolografico setores={setores} />

            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                border: "1px solid #45a29e",
              }}
            >
              <DicionarioDados />

              <TextField
                multiline
                rows={2}
                fullWidth
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Insira o comando SQL aqui..."
                disabled={sprintAtualId === 99}
                sx={{
                  mb: 1.5,
                  backgroundColor: "#000",
                  "& .MuiOutlinedInput-root": {
                    color: "primary.main",
                    "& fieldset": { borderColor: "#45a29e" },
                    "&:hover fieldset": { borderColor: "primary.main" },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                      boxShadow: "0 0 10px #66fcf1 inset",
                    },
                  },
                }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: output.includes("❌") ? "error.main" : "#c5c6c7",
                    flex: 1,
                    mr: 2,
                    fontFamily: "monospace",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {output}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleExecuteSQL}
                  disabled={sprintAtualId === 99}
                  sx={{
                    fontWeight: "bold",
                    width: "200px",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "#000",
                      boxShadow: "0 0 15px #66fcf1",
                    },
                  }}
                >
                  Executar Comando
                </Button>
              </Box>
            </Paper>
          </Box>

          {/* COLUNA DIREITA: HUD DE DIRETRIZES */}
          <Paper
            sx={{
              width: "360px",
              p: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "rgba(31, 40, 51, 0.8)",
              border: "1px solid #45a29e",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                mb: 2,
                borderBottom: "1px solid #45a29e",
                pb: 1,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              📋 Missões Ativas
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              {sprintAtual && sprintAtualId !== 99 ? (
                sprintAtual.missoes.map((missao) => {
                  const isConcluida = missoesConcluidas.includes(missao.id);
                  return (
                    <Alert
                      key={missao.id}
                      severity={isConcluida ? "success" : "error"}
                      variant="filled"
                      sx={{
                        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                        "& .MuiAlert-message": {
                          fontSize: "0.85rem",
                          lineHeight: 1.4,
                        },
                      }}
                    >
                      {missao.descricao}
                    </Alert>
                  );
                })
              ) : (
                <Typography variant="body2" sx={{ color: "#aaa" }}>
                  Nenhuma missão pendente. Metrópole segura.
                </Typography>
              )}
            </Box>
            {sprintConcluida && (
              <Button
                variant="contained"
                onClick={avancarSprint}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#66fcf1",
                  color: "#000",
                  boxShadow: "0 0 15px #66fcf1",
                  "&:hover": { backgroundColor: "#fff" },
                }}
              >
                Avançar de Fase ➔
              </Button>
            )}
          </Paper>
        </Box>
      )}

      {/* COMPONENTES MODAIS */}
      <ModalResultado
        open={modalResultadoAberto}
        onClose={() => setModalResultadoAberto(false)}
        queryResult={queryResult}
      />

      <Dialog
        open={modalIntroAberto}
        onClose={() => setModalIntroAberto(false)}
        maxWidth="md"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#1f2833",
            border: "2px solid #66fcf1",
            boxShadow: "0 0 20px rgba(102, 252, 241, 0.5)",
            color: "#c5c6c7",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#66fcf1",
            fontWeight: "bold",
            borderBottom: "1px solid #45a29e",
            pb: 2,
          }}
        >
          Informações do Sistema Central
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Bem-vindo ao Sistema Central, Administrador.
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Antes de operar, você deve compreender a nossa arquitetura: a
            metrópole é um reflexo direto de um{" "}
            <strong>Banco de Dados Relacional</strong>.
          </Typography>
          <Box sx={{ pl: 2, mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              🔹 <strong>TABELAS:</strong> Representam a estrutura da cidade.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              🔹 <strong>ATRIBUTOS (Colunas):</strong> São os nossos sensores.
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              🔹 <strong>REGISTROS (Linhas):</strong> São os distritos físicos.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setModalIntroAberto(false)}
            variant="outlined"
            sx={{
              color: "#66fcf1",
              borderColor: "#66fcf1",
              fontWeight: "bold",
            }}
          >
            Voltar ao Menu
          </Button>
        </DialogActions>
      </Dialog>

      {sprintAtual && (
        <Dialog
          open={modalAberto}
          onClose={() => setModalAberto(false)}
          maxWidth="md"
          fullWidth
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#1f2833",
              border: "2px solid #66fcf1",
              boxShadow: "0 0 20px rgba(102, 252, 241, 0.5)",
              color: "#c5c6c7",
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "#66fcf1",
              fontWeight: "bold",
              borderBottom: "1px solid #45a29e",
              pb: 2,
            }}
          >
            {sprintAtual.titulo}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <Box sx={{ mb: 3 }}>
              {sprintAtual.tutorial.map((linha, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ mb: 1.5, lineHeight: 1.6 }}
                >
                  {linha}
                </Typography>
              ))}
            </Box>
            <Divider sx={{ backgroundColor: "#45a29e", mb: 2 }} />
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              💡 EXEMPLO DE USO:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                p: 2,
                backgroundColor: "#0b0c10",
                borderLeft: "4px solid #66fcf1",
                fontFamily: "monospace",
              }}
            >
              {sprintAtual.exemplo}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
            <Button
              onClick={() => setModalAberto(false)}
              variant="contained"
              sx={{
                backgroundColor: "#66fcf1",
                color: "#000",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#fff" },
              }}
            >
              Entendido!
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </ThemeProvider>
  );
}
