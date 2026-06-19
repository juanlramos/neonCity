import { Paper, Typography, Card } from "@mui/material";
import type { Setor } from "../types";

interface MapaHolograficoProps {
  setores: Setor[];
}

export default function MapaHolografico({ setores }: MapaHolograficoProps) {
  return (
    <Paper
      sx={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #45a29e",
        backgroundColor: "#05080a",
        backgroundImage: `
          radial-gradient(circle at center, rgba(102, 252, 241, 0.1) 0%, transparent 60%),
          linear-gradient(rgba(102, 252, 241, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(102, 252, 241, 0.15) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        backgroundPosition: "center center",
        minWidth: 0,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          position: "absolute",
          top: 10,
          left: 15,
          color: "#45a29e",
          letterSpacing: 2,
        }}
      >
        RADAR CENTRAL DA METRÓPOLE
      </Typography>

      {setores.map((setor) => {
        const isCritico = setor.status_seguranca === "CRITICO";
        let positionStyles = {};
        switch (setor.zona) {
          case "Norte":
            positionStyles = {
              top: "12%",
              left: "50%",
              transform: "translate(-50%, 0)",
            };
            break;
          case "Sul":
            positionStyles = {
              bottom: "12%",
              left: "50%",
              transform: "translate(-50%, 0)",
            };
            break;
          case "Leste":
            positionStyles = {
              top: "50%",
              right: "5%",
              transform: "translate(0, -50%)",
            };
            break;
          case "Central":
            positionStyles = {
              top: "50%",
              left: "30%",
              transform: "translate(-50%, -50%)",
            };
            break;
          default:
            positionStyles = {
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            };
        }

        return (
          <Card
            key={setor.id_setor}
            sx={{
              position: "absolute",
              ...positionStyles,
              minWidth: "160px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(4px)",
              p: 1.5,
              border: "2px solid",
              borderColor: isCritico ? "error.main" : "primary.main",
              boxShadow: isCritico
                ? "0 0 25px rgba(255, 0, 60, 0.6)"
                : "0 0 15px rgba(102, 252, 241, 0.2)",
              animation: isCritico ? "pulse 2s infinite" : "none",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 10px rgba(255, 0, 60, 0.4)" },
                "50%": { boxShadow: "0 0 25px rgba(255, 0, 60, 0.8)" },
                "100%": { boxShadow: "0 0 10px rgba(255, 0, 60, 0.4)" },
              },
              zIndex: 10,
            }}
          >
            <Typography
              variant="subtitle1"
              color={isCritico ? "error.main" : "primary.main"}
              align="center"
              sx={{ fontWeight: "bold", lineHeight: 1.2 }}
            >
              {setor.nome_distrito}
            </Typography>
            <Typography
              variant="button"
              sx={{
                mt: 1,
                fontSize: "0.7rem",
                fontWeight: "bold",
                color: isCritico ? "error.main" : "primary.main",
              }}
            >
              [{setor.status_seguranca}]
            </Typography>
          </Card>
        );
      })}
    </Paper>
  );
}
