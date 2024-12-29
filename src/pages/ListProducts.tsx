import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import axios from "axios";
import { Product } from "../components/ProductList";

function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>("http://127.0.0.1:8000/products/")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Erro ao listar produtos:", error));
  }, []);

  return (
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
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <Button component={Link} to={`/products/edit/${product.id}`} variant="contained" color="primary" size="small">
                  Editar
                </Button>
                <Button component={Link} to={`/products/delete/${product.id}`} variant="contained" color="secondary" size="small" sx={{ ml: 1 }}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ListProducts;
