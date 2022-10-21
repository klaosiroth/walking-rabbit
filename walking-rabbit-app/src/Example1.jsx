import { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import Navbar from './components/Navbar';

// const PRODUCTS = [
//   { id: 1, category: 'Coffee', name: 'Espresso', price: 25, stocked: true },
//   { id: 2, category: 'Coffee', name: 'Americano', price: 30, stocked: true },
//   { id: 3, category: 'Coffee', name: 'Latte', price: 35, stocked: true },
//   { id: 4, category: 'Tea', name: 'Taiwan tea', price: 35, stocked: true },
//   { id: 5, category: 'Tea', name: 'Thai tea', price: 25, stocked: false },
//   { id: 6, category: 'Soft Drink', name: 'Soda', price: 15, stocked: true },
//   { id: 7, category: 'Soft Drink', name: 'Cola', price: 15, stocked: true },
//   { id: 8, category: 'Soft Drink', name: 'Energy drink', price: 20, stocked: true },
// ];

const CATEGORY_OPTIONS = [
  { id: 1, name: 'Coffee' },
  { id: 2, name: 'Tea' },
  { id: 3, name: 'Soft Drink' },
];

const PRODUCT_OPTIONS = [
  { id: 1, categoryId: 1, price: 25, stocked: true, name: 'Espresso' },
  { id: 2, categoryId: 1, price: 30, stocked: true, name: 'Americano' },
  { id: 3, categoryId: 1, price: 35, stocked: true, name: 'Latte' },
  { id: 4, categoryId: 2, price: 35, stocked: true, name: 'Taiwan tea' },
  { id: 5, categoryId: 2, price: 25, stocked: false, name: 'Thai tea' },
  { id: 6, categoryId: 3, price: 15, stocked: true, name: 'Soda' },
  { id: 7, categoryId: 3, price: 15, stocked: true, name: 'Cola' },
  { id: 8, categoryId: 3, price: 20, stocked: true, name: 'Energy drink' },
];

export default function App() {
  // const [products, setProducts] = useState([]);
  // // const [selectedCategory, setSelectedCategory] = useState();

  // // const fetchProducts = async () => {
  // //   try {
  // //     const { data: products } = await axiosInstance('/api/products');
  // //     setProducts(products);
  // //   } catch (error) {
  // //     console.error(error);
  // //   }
  // // }

  // // Add default value on page load
  // useEffect(() => {
  //   // fetchProducts
  //   setProducts(PRODUCT_OPTIONS);
  // }, []);

  // const productsPerCategory = CATEGORY_OPTIONS.reduce((acc, category) => {
  //   return [
  //     ...acc,
  //     {
  //       ...category,
  //       products: products.filter((product) => product.categoryId === category.id),
  //     },
  //   ];
  // }, []);

  // console.log('productsPerCategory', productsPerCategory);

  // // function getFilterdList() {
  // //   if (!selectedCategory) {
  // //     return products;
  // //   }

  // //   return products.filter((product) => product.categoryId === selectedCategory);
  // // }

  // // function handleCategoryChange(event) {
  // //   setSelectedCategory(event.target.value);
  // // }

  // useEffect(() => {
  //   const data = window.localStorage.getItem('PRODUCT_STATE');
  //   if (data !== null) setProducts(JSON.parse(data));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem('PRODUCT_STATE', JSON.stringify(products));
  // }, [products]);

  console.count('component rendered!');

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="/items/:categoryId" element={<Items />} />
      </Routes>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Categories />
      <section>
        <ul></ul>
      </section>
      {/* <ProductList products={products} /> */}
    </>
  );
}

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      // const { data: catgories } = await axios.get('http://localhost:5000/api/categories');
      setCategories(CATEGORY_OPTIONS);
    })();
  }, []);

  console.log('categories', categories);

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>All Categories</h1>
      <section>
        {categories.map((category) => (
          <div key={category.id}>
            <h3>
              <Link to={`/items/${category.id}`}>{category.name}</Link>
            </h3>
          </div>
        ))}
      </section>
    </>
  );
};

const Items = () => {
  const { categoryId } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      // const { data: catgories } = await axios.get('http://localhost:5000/api/categories');
      setItems(PRODUCT_OPTIONS);
    })();
  }, [categoryId]);

  return (
    <div className="item__wrapper">
      {items.map((item) => (
        <div class="ui card" key={item.id}>
          <div class="content">
            <div class="header">{item.name}</div>
          </div>
          <div class="content">
            <p>{item.price}</p>
            <span>Category: {item.categoryId}</span>
          </div>
          <div class="extra content">
            <button class="ui button">Show More</button>
          </div>
        </div>
      ))}
    </div>
  );
};

// function ProductList({ products }) {
//   console.log('products ===', products);
//   // const [inStock, setInStock] = useState(false);

//   return (
//     <section>
//       <h2>All Products</h2>
//       {products.map((product) => (
//         <Product product={product} key={product.id} />
//       ))}
//     </section>
//   );
// }
// function Product({ product }) {
//   const productName = product.stocked ? (
//     product.name
//   ) : (
//     <span style={{ color: 'red' }}>{product.name}</span>
//   );

//   return (
//     <div style={{ marginBottom: '24px' }}>
//       <h3>{productName}</h3>
//       <div>
//         <span>{product.price}</span>
//       </div>
//     </div>
//   );
// }
