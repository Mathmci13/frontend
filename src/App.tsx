import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';

/* eslint-disable @typescript-eslint/no-unused-expressions */
const App = () => {
  const [products, setProducts] = useState<any>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  }); ProductList

  // Função para carregar os produtos da API
  const loadProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/products');
      console.log(response)
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
    }
  };

  // Função para adicionar um novo produto
  const handleAddProduct = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/products', newProduct);
      setNewProduct({ name: '', description: '', price: '', quantity: '' }); // Limpa os campos
      loadProducts(); // Recarrega os produtos
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  // Efeito para carregar produtos quando o componente é montado
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="App">
      <h1>Produtos</h1>
      <ProductList products={products} />
      <h2>Adicionar Produto</h2>
      <input
        type="text"
        placeholder="Nome"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrição"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
      />
      <button onClick={handleAddProduct}>Adicionar Produto</button>
    </div>
  );
};

export default App;
