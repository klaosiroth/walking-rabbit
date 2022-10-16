import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import Product from './components/Product';

function App() {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data: getAllCatgories } = await axios.get('http://localhost:5000/api/categories');
  //     setCategories(getAllCatgories);
  //   })();
  // }, []);

  // console.log('categories', categories);
  console.count('component rendered!');

  return (
    <>
      <Product />

      {/* <Navbar />

      <Tabs />

      <section>
        <div className="container">
          <h2>All Categories</h2>
          <div className="Products">
            {categories.map((category) => (
              <div
                className="Product"
                key={category.id}
                // onClick={() => handleSelectProduct(category)}
              >
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Product /> */}
    </>
  );
}

export default App;
