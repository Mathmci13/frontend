import React from 'react';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description} <br />
            Preço: R${product.price} | Quantidade: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
