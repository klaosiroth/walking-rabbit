import { useCallback, useEffect, useState, useMemo } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFormContext, Controller, FormProvider } from 'react-hook-form';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

import {
  PRODUCTS,
  CATEGORY_OPTIONS,
  PRODUCT_OPTIONS,
  ATTRIBUTETYPES_OPTIONS,
  ATTRIBUTES_OPTIONS,
} from './_mock';
import axios from './utils/axios';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import NoMatch from './components/NoMatch';
import Form from './components/Form';
import Posts from './pages/Posts';
import Post from './pages/Post';

function applyFilter(products, filterCategory) {
  // FILTER PRODUCTS
  if (filterCategory !== 'All') {
    products = products.filter((product) => product.category === filterCategory);
  }

  return products;
}

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

        console.log('products', products);

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

  console.log('products', products);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route exact path="/products" element={<FilterableProducts products={products} />} />
          <Route path="/products/:productId" element={<Product />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function FilterableProducts({ products }) {
  const [filterCategory, setfilterCategory] = useState('All');
  const productsFiltered = applyFilter(products, filterCategory);

  function handleFilterProduct(category) {
    setfilterCategory(category);
    console.log('category: ', category);
  }

  return (
    <>
      <ProductFilter onFilterProduct={handleFilterProduct} />
      <Products products={productsFiltered} />
    </>
  );
}

function ProductFilter({ onFilterProduct }) {
  const allCategories = ['All', ...new Set(CATEGORY_OPTIONS.map((option) => option.name))];

  const listCategories = allCategories.map((category, index) => (
    <li key={index} onClick={() => onFilterProduct(category)}>
      {category}
    </li>
  ));

  return (
    <>
      <ul className="ProductFilter">{listCategories}</ul>
    </>
  );
}

function Products({ products }) {
  return (
    <>
      <section>
        <div className="container">
          <div className="Products">
            {products.map((product) => (
              <div className="Product__card" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${product.name}.png`}
                    alt={product.name}
                  />
                  <h3>{product.name}</h3>
                  <p>Price: {product.price}฿</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Product() {
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
            <Link to="/products">Go to the products</Link>
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

function ProductDetailsSummary({ currentProduct }) {
  const navigate = useNavigate();

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    setAttributes(ATTRIBUTES_OPTIONS);
  }, []);

  console.log('attributes', attributes);

  const defaultValues = useMemo(
    () => ({
      productName: currentProduct?.name,
      categoryName: currentProduct?.category || null,
      totalPrice: currentProduct?.price || 0,
      types: 'Hot',
      sweetness: 'Default',
      isStraw: false,
      isCupCover: false,
    }),
    [currentProduct]
  );

  const handleSelect = (attr) => {
    const { attributeType } = attr;
    console.log(attributeType);
    // if ( === 'Cold') {
    //   console.log('ok');
    // }
  };

  const handleSubmit = async (event, data) => {
    event.preventDefault();

    try {
      // await axios.post('API', formData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // alert(`Wait 5 seconds for the product...`);
      navigate('/products');
      console.log('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>ProductDetailsSummary</h2>
      <form onSubmit={handleSubmit}>
        {attributes.map((attr) => {
          return (
            <div key={attr.id} onClick={() => handleSelect(attr)}>
              <div>{attr.name}</div>
            </div>
          );
        })}
        <button>Submit</button>
      </form>
    </>
  );
}

function Order() {
  return (
    <>
      <h2>Order</h2>
    </>
  );
}

//   // const filterResult = (category) => {
//   //   const result = products.filter((product) => {
//   //     return product.category === category;
//   //   });

//   //   setProducts(result);
//   // };

//   // function handleClick() {
//   //   console.log('click');
//   // }
