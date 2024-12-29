import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from '@mui/material';

const DeleteProduct: React.FC = () => {
  const [productId, setProductId] = useState('');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/products/${productId}`);
      alert('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
      alert('Erro ao deletar o produto.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Deletar Produto
      </Typography>
      <TextField
        label="ID do Produto"
        variant="outlined"
        fullWidth
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="error" onClick={handleDelete}>
        Deletar
      </Button>
    </div>
  );
};

export default DeleteProduct;
