import { useCallback, useEffect, useState, useMemo } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFormContext, Controller, FormProvider } from 'react-hook-form';

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
import NoMatch from './pages/404';
import Form from './components/Form';

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

  const categoriesList = allCategories.map((category, index) => (
    <li key={index} onClick={() => onFilterProduct(category)}>
      {category}
    </li>
  ));

  return (
    <>
      <ul>{categoriesList}</ul>
    </>
  );
}

function Products({ products }) {
  return (
    <>
      <section>
        <h2>All Products</h2>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h3>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <p>Price: ฿{product.price}</p>
            </div>
          ))}
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

// export default function App() {
//   // const listProducts = products.map((product) => {
//   //   const { id, name } = product;

//   //   return (
//   //     <div key={id}>
//   //       <div>{name}</div>
//   //     </div>
//   //   );
//   // });

//   // const filterResult = (category) => {
//   //   const result = products.filter((product) => {
//   //     return product.category === category;
//   //   });

//   //   setProducts(result);
//   // };

//   // function handleClick() {
//   //   console.log('click');
//   // }

//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Products products={products} />} exact />
//       </Routes>
//     </>
//   );
// }

// const [categories, setCategories] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState();

// useEffect(() => { fetchProducts
//   (async () => {
//     try {
//       // const {data: products} = await axios.get()
//       // const {data: categories} = await axios.get()
//       const productsByCategory = CATEGORY_OPTIONS.reduce((accumulator, category) => {
//         return [
//           ...accumulator,
//           {
//             ...category,
//             products: PRODUCT_OPTIONS.filter((product) => product.categoryId === category.id),
//           },
//         ];
//       }, []);

//       setCategories(productsByCategory);
//     } catch (error) {
//       console.error(error);
//     }
//   })();
// }, []);

// const [selectedProduct, setSelectedProduct] = useState(null);

// function handleClick(product) {
//   console.log(product);
//   setSelectedProduct(product);
// }

// import useIsMountedRef from './hooks/useIsMountedRef';
// const isMountedRef = useIsMountedRef();
// const [products, setProducts] = useState([]);
// const [error, setError] = useState(null);

// const getProducts = useCallback(async () => {
//   try {
//     const { data: products } = await axios.get('/api/products');

//     if (isMountedRef) setProducts(products);
//   } catch (error) {
//     console.error(error);
//     setError(error.message);
//   }
// }, [isMountedRef]);

// useEffect(() => {
//   console.count('Component mounted');
//   getProducts();
// }, [getProducts]);
