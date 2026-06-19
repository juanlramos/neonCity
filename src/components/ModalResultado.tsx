import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import type { QueryResultData } from "../types";

interface ModalResultadoProps {
  open: boolean;
  onClose: () => void;
  queryResult: QueryResultData | null;
}

export default function ModalResultado({
  open,
  onClose,
  queryResult,
}: ModalResultadoProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#0b0c10",
          border: "2px solid #66fcf1",
          boxShadow: "0 0 30px rgba(102, 252, 241, 0.4)",
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
          letterSpacing: 1,
        }}
      >
        📡 TERMINAL DE INFRAESTRUTURA - RESULTADO DOS ATRIBUTOS
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        {queryResult && (
          <TableContainer
            component={Paper}
            sx={{
              backgroundColor: "#1f2833",
              border: "1px solid rgba(102, 252, 241, 0.3)",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {queryResult.columns.map((col, idx) => (
                    <TableCell
                      key={idx}
                      sx={{
                        backgroundColor: "rgba(102, 252, 241, 0.15)",
                        color: "#66fcf1",
                        fontWeight: "bold",
                        borderBottom: "2px solid #66fcf1",
                        py: 1.5,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {queryResult.values.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(102, 252, 241, 0.08)",
                      },
                    }}
                  >
                    {row.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        sx={{
                          color: "#fff",
                          borderBottom: "1px solid rgba(69, 162, 158, 0.3)",
                          py: 1.5,
                          fontSize: "0.9rem",
                        }}
                      >
                        {String(cell)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#66fcf1",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#fff" },
          }}
        >
          Fechar Varredura de Dados
        </Button>
      </DialogActions>
    </Dialog>
  );
}
