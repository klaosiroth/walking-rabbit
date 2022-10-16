import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Product from './components/Product';

function App() {
  const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [attributeTypes, setAttributeTypes] = useState([]);
  // const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    (async () => {
      const { data: getAllCatgories } = await axios.get('http://localhost:5000/api/categories');
      // const { data: getAllProducts } = await axios.get('http://localhost:5000/api/products');
      // const { data: getAllAttributeTypes } = await axios.get(
      //   'http://localhost:5000/api/attributetypes'
      // );
      // const { data: getAllattributes } = await axios.get('http://localhost:5000/api/attributes');
      setCategories(getAllCatgories);
      // setProducts(getAllProducts);
      // setAttributeTypes(getAllAttributeTypes);
      // setAttributes(getAllattributes);
    })();
  }, []);

  console.log('categories', categories);
  // console.log('products', products);
  // console.log('attributeTypes', attributeTypes);
  // console.log('attributes', attributes);

  // const listCategories = categories.map((category) => <li key={category.id}>{category.name}</li>);
  // const listProducts = products.map((product) => <li key={product.id}>{product.name}</li>);
  // const listAttributeTypes = attributeTypes.map((attributeType) => (
  //   <li key={attributeType.id}>{attributeType.name}</li>
  // ));
  // const listAttributes = attributes.map((attribute) => (
  //   <li key={attribute.id}>{attribute.name}</li>
  // ));

  console.count('component rendered!');

  return (
    <>
      <Navbar />
      <Product />

      {/* <main className="container">
        <ul>{listCategories}</ul>
        <ul>{listProducts}</ul>
        <ul>{listAttributeTypes}</ul>
        <ul>{listAttributes}</ul>
      </main> */}
    </>
  );
}

export default App;
