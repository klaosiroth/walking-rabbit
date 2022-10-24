import { useEffect, useState, useMemo } from 'react';

const PRODUCTS = [
  { id: 1, category: 'Coffee', name: 'Espresso', price: 25, stocked: true },
  { id: 2, category: 'Coffee', name: 'Americano', price: 30, stocked: true },
  { id: 3, category: 'Coffee', name: 'Latte', price: 35, stocked: true },
  { id: 4, category: 'Tea', name: 'Taiwan tea', price: 35, stocked: true },
  { id: 5, category: 'Tea', name: 'Thai tea', price: 25, stocked: false },
  { id: 6, category: 'Soft Drink', name: 'Soda', price: 15, stocked: true },
  { id: 7, category: 'Soft Drink', name: 'Cola', price: 15, stocked: true },
  { id: 8, category: 'Soft Drink', name: 'Energy drink', price: 20, stocked: true },
];

export default function App() {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState();

  // Add default value on page load
  useEffect(() => {
    setProducts(PRODUCTS);
  }, []);

  // Function to get filtered list
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return products;
    }
    return products.filter((product) => product.category === selectedCategory);
  }

  // Avoid duplicate function calls with useMemo
  const filteredList = useMemo(getFilteredList, [selectedCategory, products]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <>
      <div className="filter-container">
        <div>Filter by Category:</div>
        <div>
          <select name="category-list" id="category-list" onChange={handleCategoryChange}>
            <option value="">All</option>
            <option value="Coffee">Coffee</option>
            <option value="Tea">Tea</option>
            <option value="Soft Drink">Soft Drink</option>
          </select>
        </div>
      </div>
      <div className="sport-list">
        {filteredList.map((element, index) => (
          <Item {...element} key={index} />
        ))}
      </div>
    </>
  );
}

const Item = ({ name, category }) => (
  <div className="item-container">
    <div>
      <span className="item-label">Name:</span>
      {name}
    </div>
    <div>
      <span className="item-label">Category:</span>
      {category}
    </div>
  </div>
);
