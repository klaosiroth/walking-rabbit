import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import _products from 'src/_mock/product';
import {
  PRODUCTS,
  CATEGORY_OPTIONS,
  PRODUCT_OPTIONS,
  ATTRIBUTETYPES_OPTIONS,
  ATTRIBUTES_OPTIONS,
} from 'src/_mock';

import './Product.css';

import Form from 'src/components/Form';

export default function Product() {
  const { productId } = useParams();

  const [products, setProducts] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);

  const getProduct = useCallback(async () => {
    try {
      // const { data: products } = await axios.get(`/api/products/`);

      setProducts(PRODUCT_OPTIONS);
      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      setLoadingProduct(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (productId) {
      getProduct();
    }
  }, [getProduct, productId]);

  if (loadingProduct) return 'Loading...';

  if (error) return 'An error has occurred: ' + error;

  const currentProduct = products.find((product) => product.id === Number(productId));

  return (
    <>
      <section>
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <Link to="/">Go to the products</Link>
          </div>
          <ProductDetails product={currentProduct} />
        </div>
      </section>
    </>
  );
}

function ProductDetails({ product }) {
  console.log(product);

  if (!product) {
    return null;
  }

  const { name, price } = product;

  return (
    <>
      <div className="Product">
        <div className="Product__image">
          <img src={`/images/${name}.png`} alt="name" />
        </div>

        <div>
          <h2>{name}</h2>
          {/* <p>Price: {price}฿</p> */}
          <Form product={product} />
        </div>
      </div>
    </>
  );
}

// Object.keys(selectedProduct).length !== 0
