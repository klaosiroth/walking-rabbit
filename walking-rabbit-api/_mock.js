const categories = await Category.bulkCreate([
  { name: 'Coffee' },
  { name: 'Tea' },
  { name: 'Soft drink' },
]);
console.log(JSON.stringify(categories, null, 4));

const products = await Product.bulkCreate([
  {
    name: 'Espresso',
    price: 25,
    duration: 35,
    categoryId: 1,
  },
  {
    name: 'Americano',
    price: 30,
    duration: 40,
    categoryId: 1,
  },
  {
    name: 'Latte',
    price: 35,
    duration: 45,
    categoryId: 1,
  },
  {
    name: 'Taiwan tea',
    price: 35,
    duration: 35,
    categoryId: 2,
  },
  {
    name: 'Thai tea',
    price: 25,
    duration: 35,
    categoryId: 2,
  },
  {
    name: 'Soda',
    price: 15,
    duration: 30,
    categoryId: 3,
  },
  {
    name: 'Cola',
    price: 15,
    duration: 30,
    categoryId: 3,
  },
  {
    name: 'Energy drink',
    price: 20,
    duration: 30,
    categoryId: 3,
  },
]);

console.log(JSON.stringify(products, null, 4));

const attributeTypes = await AttributeType.bulkCreate([
  { name: 'Type' },
  { name: 'Sweetness' },
  { name: 'Option' },
]);
console.log(JSON.stringify(attributeTypes, null, 4));

const attributes = await Attribute.bulkCreate([
  {
    name: 'Hot',
    price: 0,
    duration: 0,
    attributeTypeId: 1,
  },
  {
    name: 'Cold',
    price: 5,
    duration: 5,
    attributeTypeId: 1,
  },
  {
    name: 'Less sugar',
    price: 0,
    duration: 0,
    attributeTypeId: 2,
  },
  {
    name: 'Default',
    price: 0,
    duration: 0,
    attributeTypeId: 2,
  },
  {
    name: 'More sugar',
    price: 0,
    duration: 0,
    attributeTypeId: 2,
  },
  {
    name: 'Straw',
    price: 0,
    duration: 0,
    attributeTypeId: 3,
  },
  {
    name: 'Cup cover',
    price: 0,
    duration: 0,
    attributeTypeId: 3,
  },
]);
console.log(JSON.stringify(attributes, null, 4));
