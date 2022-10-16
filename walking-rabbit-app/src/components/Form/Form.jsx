import { useState } from 'react';
import './Form.css';

const Form = () => {
  const defaultValues = {
    types: 'Hot',
    sweetness: 'Default',
    isStraw: false,
    isCupCover: false,
  };

  const [formData, setFormData] = useState(defaultValues);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // await axios.post('API', formData);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFormData(defaultValues);
      console.log(JSON.stringify(formData, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
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
          checked={formData.isStraw}
        />
        <label htmlFor="isStraw">Straw</label>
        <br />

        <input
          type="checkbox"
          name="isCupCover"
          id="isCupCover"
          onChange={handleChange}
          checked={formData.isCupCover}
        />
        <label htmlFor="isCupCover">Cup cover</label>
      </fieldset>

      <button>Submit</button>
    </form>
  );
};

export default Form;
