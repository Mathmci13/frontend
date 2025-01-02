import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsNoJinja: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<any>('');

  useEffect(() => {
    // Realizando a requisição GET para a rota que retorna o HTML renderizado pelo Jinja
    axios.get('http://127.0.0.1:8000/productsNoJinja', { responseType: 'text' })
      .then(response => {
        console.log(response.data);
        setHtmlContent(response.data); // Salvando o HTML retornado no estado
      })
      .catch(error => {
        console.error('Erro ao carregar a página Jinja:', error);
      });
  }, []);

  return (
    <div>
      <h2>Produtos com Jinja</h2>
      {/* Aqui estamos injetando o HTML bruto no DOM */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default ProductsNoJinja;
