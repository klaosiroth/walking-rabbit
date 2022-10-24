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

function applyFilter(products, filterCategory) {
  // FILTER PRODUCTS
  if (filterCategory !== 'All') {
    products = products.filter((product) => product.category === filterCategory);
  }

  return products;
}
