import { useCallback, useEffect, useState } from 'react';
import './Product.css';
import axios from 'axios';
import _products from 'src/_mock/product';

import Form from 'src/components/Form';

const Product = () => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(_products);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributes, setAttributes] = useState([] || null);

  const [selectedProduct, setSelectedProduct] = useState({});
  // const [selectedAttributes, setSelectedAttributes] = useState(null);

  useEffect(() => {
    (async () => {
      // const { data: getAllProducts } = await axios.get('http://localhost:5000/api/products');
      // setProducts(getAllProducts);
      const { data: getAllAttributeTypes } = await axios.get(
        'http://localhost:5000/api/attributetypes'
      );
      const { data: getAllattributes } = await axios.get('http://localhost:5000/api/attributes');
      setAttributeTypes(getAllAttributeTypes);
      setAttributes(getAllattributes);
    })();
  }, []);

  const handleSelectProduct = useCallback((product) => {
    setSelectedProduct(product);
  }, []);

  // const handleSelectAttribute = useCallback(() => {}, []);

  // const handleSelectAttribute = useCallback((product) => {
  //   const selectedAttributes = attributes.filter(({ id }) =>
  //     selectedProduct.availableAttribute.includes(id)
  //   );
  //   setSelectedProduct(product);
  // }, [attributes, selectedProduct.availableAttribute]);

  // const selected = { productId: 1, attributes: [2, 4, 6, 7] };
  // const selectedAttributes = attributes.filter(({ id }) => selectedProduct.attributes.includes(id));
  // const totalPrice =
  //   Number(selectedProduct.price) +
  //   selectedAttributes.reduce(
  //     (accumulator, currentValue) => Number(accumulator) + Number(currentValue.price),
  //     0
  //   );

  // const totalDuration =
  //   selectedProduct.duration +
  //   selectedAttributes.reduce(
  //     (accumulator, currentValue) => accumulator + currentValue.duration,
  //     0
  //   );

  console.log('selectedProduct', selectedProduct);
  console.log('attributes', attributes);
  console.log('attributeTypes', attributeTypes);

  // const result = {
  //   categoryId: selectedProduct.categoryId,
  //   productId: selectedProduct.id,
  //   price: totalPrice,
  //   duration: totalDuration,
  // };
  // console.log(result);

  return (
    <>
      <section>
        <div className="container">
          <h2>All Products</h2>
          <div className="Products">
            {products.map((product) => (
              <div
                className="Product"
                key={product.id}
                onClick={() => handleSelectProduct(product)}
              >
                <h3>{product.name}</h3>
                <div>
                  <span>{product.price} ฿</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Selected Product</h2>
          <div>{selectedProduct?.name}</div>
          <div>{selectedProduct?.price}</div>

          <div>
            <span>Avaible Attributes: </span>
            {Object.keys(selectedProduct).length !== 0 &&
              selectedProduct.availableAttribute.map((option, index) => (
                <span key={index}>{option}</span>
              ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Select Attributes</h2>
          <Form />
        </div>
      </section>

      <section>
        <div className="container">
          <h2>Order Summary</h2>
          {/* <div>{result.price} ฿</div>
          <div>{result.duration} sec</div> */}
        </div>
      </section>
    </>
  );
};

export default Product;
