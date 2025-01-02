import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import axios from "axios";
import { Product } from "../components/ProductList";
import ConfirmDialog from './ConfirmDialog';

function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    axios.get<Product[]>("http://127.0.0.1:8000/products/")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erro ao listar produtos:", error));
  }, []);

  const handleOpenDialog = (id: number) => {
    setProductIdToDelete(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  const handleDelete = async () => {
    if (productIdToDelete === null) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/products/${productIdToDelete}`);
      alert('Produto deletado com sucesso!');
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productIdToDelete)
      );
      handleClose();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      alert('Erro ao deletar produto.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h5">Nome</Typography></TableCell>
              <TableCell><Typography variant="h5">Descrição</Typography></TableCell>
              <TableCell><Typography variant="h5">Preço</Typography></TableCell>
              <TableCell><Typography variant="h5">Quantidade</Typography></TableCell>
              <TableCell><Typography variant="h5">Ações</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>R$ {product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary" size="small">
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small" sx={{ ml: 1 }}
                    onClick={() => handleOpenDialog(product.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={openDialog}
        title="Confirmar Exclusão"
        content={`Tem certeza de que deseja excluir o produto com ID ${productIdToDelete}? Essa ação não poderá ser desfeita.`}
        onClose={handleClose}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ListProducts;
