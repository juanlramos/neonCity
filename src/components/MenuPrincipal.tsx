import { Box, Typography, Button } from "@mui/material";

interface MenuPrincipalProps {
  onIniciar: () => void;
  onAbrirInfo: () => void;
}

export default function MenuPrincipal({
  onIniciar,
  onAbrirInfo,
}: MenuPrincipalProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#05080a",
        backgroundImage: `
          radial-gradient(circle at center, rgba(102, 252, 241, 0.05) 0%, transparent 60%),
          linear-gradient(rgba(102, 252, 241, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(102, 252, 241, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        backgroundPosition: "center center",
      }}
    >
      <Typography
        variant="h1"
        color="primary"
        sx={{
          mb: 2,
          textTransform: "uppercase",
          textShadow: "0 0 20px #66fcf1",
          letterSpacing: 8,
          fontWeight: "bold",
        }}
      >
        neonCity
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: "#c5c6c7", mb: 8, letterSpacing: 2 }}
      >
        Gerencie a cidade através de sql
      </Typography>
      <Button
        variant="outlined"
        size="large"
        onClick={onIniciar}
        sx={{
          mb: 3,
          width: "300px",
          py: 2,
          fontSize: "1.2rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "#000",
            boxShadow: "0 0 15px #66fcf1",
          },
        }}
      >
        INICIAR SISTEMA
      </Button>
      <Button
        variant="outlined"
        size="large"
        onClick={onAbrirInfo}
        sx={{
          width: "300px",
          py: 2,
          fontSize: "1.2rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "#000",
            boxShadow: "0 0 15px #66fcf1",
          },
        }}
      >
        INFORMAÇÕES
      </Button>
    </Box>
  );
}
