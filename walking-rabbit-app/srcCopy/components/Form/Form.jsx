import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_OPTIONS, ATTRIBUTETYPES_OPTIONS, ATTRIBUTES_OPTIONS } from 'src/_mock';
import axios from 'src/utils/axios';
import CountdownTimer from '../CountdownTimer';

import './Form.css';

const getFormattedPrice = (price) => `${price.toFixed(2)}฿`;

function Form({ product }) {
  console.log('product', product);
  const navigate = useNavigate();

  const defaultValues = {
    productName: product?.name,
    categoryName: product?.category,
    totalPrice: product?.price,
    type: 'Hot',
    sweetness: 'Default',
    isStraw: false,
    isCupCover: false,
  };

  const [formData, setFormData] = useState(defaultValues);
  const [attributeTypes, setAttributeTypes] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [duration, setDuration] = useState(product.duration);
  const [total, setTotal] = useState(formData.totalPrice);
  const [payment, setPayment] = useState('');
  const [counter, setCounter] = useState(-1);

  const getAttributeTypes = useCallback(async () => {
    try {
      const response = await axios.get('/api/attributetypes');
      setAttributeTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAttributeTypes();
    setAttributes(ATTRIBUTES_OPTIONS);
    // counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    // if (counter === 0) navigate('/products');

    let interval;
    if (counter > 0) {
      interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    } else if (!counter) {
      clearInterval(interval);
      setCounter(0);
    }

    return () => clearInterval(interval);
  }, [counter, getAttributeTypes]);

  console.log('attributes', attributes);
  console.log('attributeTypes', attributeTypes);

  // attributeTypes.forEach(({ attributes }) => {
  //   for (const iterator of attributes) {
  //     totalPrice += Number(iterator.price);
  //   }
  // });

  // const test = attributeTypes.map(({ attributes }) => {
  //   let totalPrice = 0;
  //   for (let i = 0; i < attributes.length; i++) {
  //     totalPrice += Number(attributes[i].price);
  //   }
  //   console.log('totalPrice', totalPrice);
  // });

  // console.log('test', test);

  // const totalPrice = product.price + 5;

  // const calculateTotalPrice = (first) => {
  //   console.log('first', first);
  //   // const totalPrice = product.reduce((total, item) => {
  //   //   return total + item.quantity;
  //   // }, 0);
  //   // setTotalPrice(totalPrice);
  // };

  // console.log('calculateTotalPrice', totalPrice);
  // console.log('attributes', attributes);
  // console.log('attributes.attributeType ', attributes.attributeType === 'Type');

  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log('useEffect runs!');
  //   const interval = setInterval(() => {
  //     setCount((count) => count + 1);
  //   }, 1000);
  //   return () => {
  //     //
  //     clearInterval(interval);
  //   };
  // }, []);

  const handleChange = useCallback((event, option, index) => {
    const { name, value, type, checked } = event.target;
    const { id, price, duration } = option;
    console.log('option', option);

    const selectedAttr = [2, 4, 6, 7];

    const selectedOption = attributes.filter(({ id }) => selectedAttr.includes(id));

    const totalPrice = formData.totalPrice + Number(price);
    const totalDuration = product.duration + Number(duration);

    console.log('selectedOption', selectedOption);
    console.log('formData1', formData.totalPrice);

    setTotal(totalPrice);
    setDuration(totalDuration);

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }, []);

  const handlePaymentChange = useCallback((event) => {
    const { value } = event.target;

    if (value !== '') {
      setPayment(Number(value));
    }
  }, []);

  console.log('payment', payment);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // await axios.post('API', formData);
      // alert(`Wait 5 seconds for the product...`);
      setFormData(defaultValues);
      setCounter(duration);
      console.log(JSON.stringify(formData, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const getOption = (name) => {
    return {
      Straw: 'isStraw',
      'Cup cover': 'isCupCover',
    }[name];
  };

  console.log('formData', JSON.stringify(formData, null, 2));
  console.log('total', total);
  console.log('duration', duration);
  console.log('counter', counter);
  console.log('selectedAttributes', selectedAttributes);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {attributeTypes.map((type) => {
          return (
            <fieldset key={type.id}>
              <legend>{type.name}</legend>
              {type.attributes.map((option, index) => {
                return (
                  <div key={option.id}>
                    <input
                      type={type.name === 'Option' ? 'checkbox' : 'radio'}
                      name={
                        type.name === 'Option' ? getOption(option.name) : type.name.toLowerCase()
                      }
                      id={option.name}
                      onChange={(event) => handleChange(event, option, index)}
                      checked={
                        type.name === 'Option'
                          ? formData[getOption(option.name)]
                          : formData[type.name.toLowerCase()] === `${option.name}`
                      }
                      value={option.name}
                    />
                    <label htmlFor={option.name}>
                      {option.name}{' '}
                      {parseFloat(option.price) !== 0 && <span>+${option.price}</span>}
                    </label>
                  </div>
                );
              })}
            </fieldset>
          );
        })}

        <section>
          <h3>Total Price: {getFormattedPrice(total)}</h3>
        </section>

        <section>
          <label>Payment:</label>
          <input type="number" name="payment" onChange={handlePaymentChange} />
        </section>

        <button type="submit">Submit</button>
      </form>

      <section>
        {!!counter && (
          <h3>
            <span>Preparing drinks....{counter}</span>
          </h3>
        )}
        {/* <CountdownTimer seconds={duration} /> */}
      </section>
    </>
  );
}

export default Form;
