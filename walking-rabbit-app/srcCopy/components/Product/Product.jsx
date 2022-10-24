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

  const currentProduct = PRODUCT_OPTIONS.find((product) => product.id === Number(productId));

  // const [product, setProduct] = useState(null);
  // const [loadingProduct, setLoadingProduct] = useState(true);
  // const [error, setError] = useState(null);

  // const getProduct = useCallback(async () => {
  //   try {
  //     const { data: product } = await axios.get(`/api/products/${productId}`);

  //     setProduct(product);
  //     setLoadingProduct(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoadingProduct(false);
  //     setError(error);
  //   }
  // }, [productId]);

  // useEffect(() => {
  //   if (productId) {
  //     getProduct();
  //   }
  // }, [getProduct, productId]);

  // if (loadingProduct) return 'Loading...';

  // if (error) return 'An error has occurred: ' + error;

  return (
    <>
      <section>
        <div className="container">
          <p>
            <Link to="/">Go to the products</Link>
          </p>
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
      <div>
        <h2>{name}</h2>
        <p>Price: {price}฿</p>
      </div>

      <div>
        <Form product={product} />

        {/* <ProductDetailsSummary currentProduct={product} /> */}
      </div>
    </>
  );
}

// Object.keys(selectedProduct).length !== 0
