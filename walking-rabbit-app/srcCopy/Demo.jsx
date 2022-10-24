import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Product from './components/Product';

function App() {
  const [categories, setCategories] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [attributeTypes, setAttributeTypes] = useState([]);
  // const [attributes, setAttributes] = useState([]);

  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data: getAllCatgories } = await axios.get('http://localhost:5000/api/categories');
  //     setCategories(getAllCatgories);
  //   })();
  // }, []);

  // console.log('categories', categories);

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
    </>
  );
}

export default App;

// const test = allCustomers.reduce((filtered, customer) => {
//   if (customer.parent_code === 'uFYJSgZnYTFCfxEemSW4yc') {
//     const someNewCustomers = {
//       id: customer.id,
//       firstName: customer.first_name_th,
//       lastName: customer.last_name,
//       position: customer.position,
//       phone: customer.contact_tel_num,
//       email: customer.email,
//     };
//     filtered.push(someNewCustomers);
//   }

//   return filtered;
// }, []);
// // .filter((customer: any) => customer.parent_code === placeCode.id)
// // .map((customer: any) => ({
// //   id: customer.id,
// //   firstName: customer.first_name_th,
// //   lastName: customer.last_name,
// //   position: customer.position,
// //   phone: customer.contact_tel_num,
// //   email: customer.email,
// // }))
