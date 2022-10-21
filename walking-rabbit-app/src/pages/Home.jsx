// import { useEffect, useState } from 'react';
import { PRODUCT_OPTIONS, ATTRIBUTETYPES_OPTIONS, ATTRIBUTES_OPTIONS } from 'src/_mock';
import CountdownTimer from 'src/components/CountdownTimer';

function Home() {
  console.log('PRODUCT_OPTIONS', PRODUCT_OPTIONS);
  console.log('ATTRIBUTETYPES_OPTIONS', ATTRIBUTETYPES_OPTIONS);
  console.log('ATTRIBUTES_OPTIONS', ATTRIBUTES_OPTIONS);

  const selectedProduct = {
    id: 1,
    categoryId: 1,
    price: 25,
    duration: 35,
    quantity: 1,
    stocked: true,
    name: 'Espresso',
  };
  // const selectedAttributes = ATTRIBUTES_OPTIONS.filter(({ id }) =>
  //   selectedProduct.attributes.includes(id)
  // );

  // console.log('selected', selected);

  const handleClick = (attr) => {
    const totalPrice = selectedProduct.price + attr.price;
    const totalDuration = selectedProduct.duration + attr.duration;
    console.log('click', attr);
    console.log('totalPrice', totalPrice);
    console.log('totalDuration', totalDuration);
  };

  return (
    <div>
      <h2>Home</h2>
      {/* <CountdownTimer seconds={60} /> */}
      {ATTRIBUTES_OPTIONS.map((attr) => (
        <div key={attr.id} onClick={() => handleClick(attr)}>
          {attr.name}
        </div>
      ))}
    </div>
  );
}

export default Home;
