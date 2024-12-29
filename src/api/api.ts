import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

// Função para pegar todos os produtos
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};

// Função para adicionar um novo produto
export const addProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post<Product>(API_URL, product);
  return response.data;
};
