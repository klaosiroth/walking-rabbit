import { useCallback, useEffect, useState, useMemo } from 'react';
import { Routes, Route, Outlet, Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFormContext, Controller, FormProvider } from 'react-hook-form';

import './Products.css';

import {
  PRODUCTS,
  CATEGORY_OPTIONS,
  PRODUCT_OPTIONS,
  ATTRIBUTETYPES_OPTIONS,
  ATTRIBUTES_OPTIONS,
} from 'src/_mock';
import axios from 'src/utils/axios';

export default function Products({ products }) {
  const [filterCategory, setfilterCategory] = useState('All');
  const productsFiltered = applyFilter(products, filterCategory);

  function handleFilterProduct(category) {
    setfilterCategory(category);
    console.log('category: ', category);
  }

  return (
    <>
      <ProductFilter onFilterProduct={handleFilterProduct} />
      <ProductList products={productsFiltered} />
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

function ProductList({ products }) {
  return (
    <>
      <section>
        <div className="container">
          <div className="Products">
            {products.map((product) => (
              <div className="Product__card" key={product.id}>
                <Link to={`/${product.id}`}>
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

function applyFilter(products, filterCategory) {
  // FILTER PRODUCTS
  if (filterCategory !== 'All') {
    products = products.filter((product) => product.category === filterCategory);
  }

  return products;
}
