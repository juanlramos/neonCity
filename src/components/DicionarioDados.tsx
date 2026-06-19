import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DicionarioDados() {
  return (
    <Accordion
      sx={{
        mb: 2,
        backgroundColor: "#0b0c10",
        border: "1px solid rgba(102, 252, 241, 0.3)",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon color="primary" />}>
        <Typography
          variant="caption"
          color="primary"
          sx={{ fontWeight: "bold", letterSpacing: 1 }}
        >
          🗂️ DICIONÁRIO DE DADOS (ESQUEMA RELACIONAL)
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ p: 2, pt: 0 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#fff", mb: 0.5 }}
            >
              <strong>Tabela:</strong> <code>setores</code>
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_setor</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>nome_distrito</code> (TEXT)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>zona</code> (TEXT)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>status_seguranca</code> (TEXT)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>populacao</code> (NUM)
            </Typography>
          </Box>
          <Box
            sx={{
              borderLeft: "1px solid rgba(69, 162, 158, 0.3)",
              pl: 2,
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#fff", mb: 0.5 }}
            >
              <strong>Tabela:</strong> <code>incidentes</code>
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_incidente</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_setor</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>tipo</code> (TEXT)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>horario</code> (TEXT)
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid rgba(69, 162, 158, 0.3)",
              pt: 1.5,
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#fff", mb: 0.5 }}
            >
              <strong>Tabela:</strong> <code>energia_reatores</code>
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_reator</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_setor</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>carga_atual</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>status_operacao</code> (TEXT)
            </Typography>
          </Box>
          <Box
            sx={{
              borderTop: "1px solid rgba(69, 162, 158, 0.3)",
              borderLeft: "1px solid rgba(69, 162, 158, 0.3)",
              pl: 2,
              pt: 1.5,
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ color: "#fff", mb: 0.5 }}
            >
              <strong>Tabela:</strong> <code>equipes_resgate</code>
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_equipe</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>especialidade</code> (TEXT)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>id_setor_atual</code> (NUM)
            </Typography>
            <Typography variant="caption" component="div">
              ▪ <code>disponivel</code> (TEXT)
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
