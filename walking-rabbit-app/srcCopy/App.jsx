import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import {
  PRODUCTS,
  CATEGORY_OPTIONS,
  PRODUCT_OPTIONS,
  ATTRIBUTETYPES_OPTIONS,
  ATTRIBUTES_OPTIONS,
} from './_mock';
import axios from './utils/axios';
import Layout from './layouts/Layout';
import Products from './components/Products';
import Product from './components/Product';
import NoMatch from './components/NoMatch';

export default function App() {
  console.count('Component rendered!');

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.count('Component mounted');
    (async () => {
      try {
        setIsLoading(true);
        console.log('Start fetching');
        // const { data: categories } = await axios.get('/api/categories');
        // const { data: products } = await axios.get('/api/products');
        const categories = CATEGORY_OPTIONS;
        const products = PRODUCT_OPTIONS;

        const productsByCategory = products.reduce((accumulator, product) => {
          const { categoryId, ...otherProduct } = product;

          const [categoryName] = categories
            .filter((category) => category.id === categoryId)
            .map(({ name }) => name);

          return [
            ...accumulator,
            {
              category: categoryName,
              ...otherProduct,
            },
          ];
        }, []);

        if (categories && products) setProducts(productsByCategory);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Products products={products} />} />
          <Route path="/:productId" element={<Product />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}
