import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_OPTIONS, ATTRIBUTETYPES_OPTIONS, ATTRIBUTES_OPTIONS } from 'src/_mock';
import axios from 'src/utils/axios';
import './Form.css';

const Form = ({ product }) => {
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
  console.log('formData', JSON.stringify(formData, null, 2));
  // const [totalPrice, setTotalPrice] = useState(0);
  const [attributes, setAttributes] = useState([]);

  const getAttributeTypes = useCallback(async () => {
    try {
      const response = await axios.get('/api/attributetypes');
      console.log();
      setAttributes(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAttributeTypes();
  }, [getAttributeTypes]);

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

  const handleChange = useCallback((event, index) => {
    const { name, value, type, checked } = event.target;
    console.log('value ===', value, index);
    // const totalPrice = selectedProduct.price + attr.price;
    // const totalDuration = selectedProduct.duration + attr.duration;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post('API', formData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      alert(`Wait 5 seconds for the product...`);
      setFormData(defaultValues);
      navigate('/products');
      console.log(JSON.stringify(formData, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  console.log('attributes', attributes);

  return (
    <form onSubmit={handleSubmit}>
      {attributes.map((type) => {
        return (
          <fieldset key={type.id}>
            <legend>{type.name}</legend>
            {type.attributes.map((option, index) => {
              return (
                <div key={option.id}>
                  <input
                    type="radio"
                    name={type.name.toLowerCase()}
                    id={option.name}
                    onChange={(event) => handleChange(event, index)}
                    checked={formData.type === `${option.name}`}
                    value={option.name}
                  />
                  <label htmlFor={option.name}>{option.name}</label>
                </div>
              );
            })}
          </fieldset>
        );
      })}
      {/* <fieldset>
        <legend>Types</legend>
        <input
          type="radio"
          name="types"
          id="hot"
          onChange={handleChange}
          checked={formData.types === 'Hot'}
          value="Hot"
        />
        <label htmlFor="hot">Hot</label>
        <br />

        <input
          type="radio"
          name="types"
          id="cold"
          onChange={handleChange}
          checked={formData.types === 'Cold'}
          value="Cold"
        />
        <label htmlFor="cold">Cold</label>
        <span>+ 5฿</span>
      </fieldset>

      <fieldset>
        <legend>Sweetness</legend>
        <input
          type="radio"
          name="sweetness"
          id="less-sugar"
          onChange={handleChange}
          checked={formData.sweetness === 'Less sugar'}
          value="Less sugar"
        />
        <label htmlFor="less-sugar">Less sugar</label>
        <br />

        <input
          type="radio"
          name="sweetness"
          id="default"
          onChange={handleChange}
          checked={formData.sweetness === 'Default'}
          value="Default"
        />
        <label htmlFor="default">Default</label>
        <br />

        <input
          type="radio"
          name="sweetness"
          id="more-sugar"
          onChange={handleChange}
          onClick={handleSelect}
          checked={formData.sweetness === 'More sugar'}
          value="More sugar"
        />
        <label htmlFor="more-sugar">More sugar</label>
      </fieldset>

      <fieldset>
        <legend>Options</legend>
        <input
          type="checkbox"
          name="isStraw"
          id="isStraw"
          onChange={handleChange}
          onClick={handleSelect}
          checked={formData.isStraw}
        />
        <label htmlFor="isStraw">Straw</label>
        <br />

        <input
          type="checkbox"
          name="isCupCover"
          id="isCupCover"
          onChange={handleChange}
          onClick={handleSelect}
          checked={formData.isCupCover}
        />
        <label htmlFor="isCupCover">Cup cover</label>
      </fieldset> */}

      <button>Submit</button>
    </form>
  );
};

export default Form;
