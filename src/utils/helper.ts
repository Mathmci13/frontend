export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  export const truncateText = (text: string, length: number): string => {
    if (text.length <= length) return text;
    return `${text.substring(0, length)}...`;
  };
  