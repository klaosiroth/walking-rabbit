import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

export const WithUseEffect = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      console.log('Start fetching');
      const { data: products } = await axios.get('');
      if (products) setProducts(products);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.count('Component mounted');
    fetchProducts();
  }, []);

  // if (isLoading) return <div>Loading...</div>;
  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {/* {isLoading && <div>Loading...</div>}
      {error && <p style={{ color: 'red' }}>{`Error: ${error}`}</p>} */}
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

function Product({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </div>
  );
}
