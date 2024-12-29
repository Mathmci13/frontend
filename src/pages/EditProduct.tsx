import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../components/ProductList';

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 1,
    quantity: 1,
  });

  useEffect(() => {
    axios.get<Product>(`http://127.0.0.1:8000/products/${id}`)
      .then(response => setProductData(response.data))
      .catch(error => console.error("Erro ao carregar produto: ", error));
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:8000/products/${productData.id}`, productData)
      .then(()=>{
        alert('Produto atualizado com sucesso!')
        navigate('/products')
      })
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
      alert('Erro ao editar o produto.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
      <Typography variant="h4" gutterBottom>
        Editar Produto
      </Typography>
      <TextField
        label="ID do Produto"
        variant="outlined"
        fullWidth
        value={productData.id}
        style={{ marginBottom: '20px' }}
        
      />
      <TextField
        label="Nome"
        name="name"
        variant="outlined"
        fullWidth
        value={productData.name}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Descrição"
        name="description"
        variant="outlined"
        fullWidth
        value={productData.description}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Preço"
        name="price"
        variant="outlined"
        type='number'
        fullWidth
        value={productData.price}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="Quantidade"
        name="quantity"
        variant="outlined"
        type='number'
        fullWidth
        value={productData.quantity}
        onChange={handleInputChange}
        style={{ marginBottom: '20px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Atualizar
      </Button>
    </Box>
  );
};

export default EditProduct;
