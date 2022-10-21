export const PRODUCTS = [
  { id: 1, category: 'Coffee', name: 'Espresso', price: 25, stocked: true },
  { id: 2, category: 'Coffee', name: 'Americano', price: 30, stocked: true },
  { id: 3, category: 'Coffee', name: 'Latte', price: 35, stocked: true },
  { id: 4, category: 'Tea', name: 'Taiwan tea', price: 35, stocked: true },
  { id: 5, category: 'Tea', name: 'Thai tea', price: 25, stocked: false },
  { id: 6, category: 'Soft Drink', name: 'Soda', price: 15, stocked: true },
  { id: 7, category: 'Soft Drink', name: 'Cola', price: 15, stocked: true },
  { id: 8, category: 'Soft Drink', name: 'Energy drink', price: 20, stocked: true },
];

export const CATEGORY_OPTIONS = [
  { id: 1, name: 'Coffee' },
  { id: 2, name: 'Tea' },
  { id: 3, name: 'Soft Drink' },
];

export const PRODUCT_OPTIONS = [
  { id: 1, categoryId: 1, price: 25, duration: 35, quantity: 1, stocked: true, name: 'Espresso' },
  { id: 2, categoryId: 1, price: 30, duration: 40, quantity: 1, stocked: true, name: 'Americano' },
  { id: 3, categoryId: 1, price: 35, duration: 45, quantity: 1, stocked: true, name: 'Latte' },
  { id: 4, categoryId: 2, price: 35, duration: 35, quantity: 1, stocked: true, name: 'Taiwan tea' },
  { id: 5, categoryId: 2, price: 25, duration: 35, quantity: 1, stocked: false, name: 'Thai tea' },
  { id: 6, categoryId: 3, price: 15, duration: 30, quantity: 1, stocked: true, name: 'Soda' },
  { id: 7, categoryId: 3, price: 15, duration: 30, quantity: 1, stocked: true, name: 'Cola' },
  { id: 8, categoryId: 3, price: 20, duration: 30, quantity: 1, stocked: true, name: 'Energy drink' },
];

export const ATTRIBUTETYPES_OPTIONS = [
  { id: 1, name: 'Type' },
  { id: 2, name: 'Sweetness' },
  { id: 3, name: 'Option' },
];

// export const ATTRIBUTES_OPTIONS = [
//   { id: 1, attributeTypeId: 1, price: 0, duration: 0, name: 'Hot' },
//   { id: 2, attributeTypeId: 1, price: 5, duration: 5, name: 'Cold' },
//   { id: 3, attributeTypeId: 2, price: 0, duration: 0, name: 'Less sugar' },
//   { id: 4, attributeTypeId: 2, price: 0, duration: 0, name: 'Default' },
//   { id: 5, attributeTypeId: 2, price: 0, duration: 0, name: 'More sugar' },
//   { id: 6, attributeTypeId: 3, price: 0, duration: 0, name: 'Straw' },
//   { id: 7, attributeTypeId: 3, price: 0, duration: 0, name: 'Cup cover' },
// ];

export const ATTRIBUTES_OPTIONS = [
  { id: 1, attributeType: 'Type', price: 0, duration: 0, name: 'Hot' },
  { id: 2, attributeType: 'Type', price: 5, duration: 5, name: 'Cold' },
  { id: 3, attributeType: 'Sweetness', price: 0, duration: 0, name: 'Less sugar' },
  { id: 4, attributeType: 'Sweetness', price: 0, duration: 0, name: 'Default' },
  { id: 5, attributeType: 'Sweetness', price: 0, duration: 0, name: 'More sugar' },
  { id: 6, attributeType: 'Option', price: 0, duration: 0, name: 'Straw' },
  { id: 7, attributeType: 'Option', price: 0, duration: 0, name: 'Cup cover' },
];

export const ORDERS = [
  {
    id: 1,
    productId: 1,
    totalPrice: 0,
    type: 'Hot',
    sweetness: 'Default',
    isStraw: false,
    isCupCover: false,
  },
];
