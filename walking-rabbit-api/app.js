const _mock = require('./_mock.json');
const { Sequelize, DataTypes, Op } = require('sequelize');

const sequelize = new Sequelize('database_test', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    underscored: true,
    paranoid: true,
  },
});

const Category = sequelize.define('Category', {
  name: DataTypes.STRING(50),
});

const Product = sequelize.define('Product', {
  name: DataTypes.STRING(50),
  price: DataTypes.DECIMAL(10, 2),
  duration: DataTypes.INTEGER(3),
  availableAttribute: DataTypes.INTEGER,
});

const AttributeType = sequelize.define('AttributeType', {
  name: DataTypes.STRING(50),
});

const Attribute = sequelize.define('Attribute', {
  name: DataTypes.STRING(50),
  price: DataTypes.DECIMAL(10, 2),
  duration: DataTypes.INTEGER(3),
  attributeTypeId: DataTypes.INTEGER,
});

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'products' });
AttributeType.hasMany(Attribute, { foreignKey: 'attributeTypeId', as: 'attributes' });
Attribute.belongsTo(AttributeType, { foreignKey: 'attributeTypeId', as: 'attributes' });

const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/categories', async (req, res) => {
  const categories = await Category.findAll({ include: [{ model: Product, as: 'products' }] });
  res.json(categories);
});

app.get('/api/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) throw Error('Product not found');
    res.json(product);
  } catch (e) {
    console.log(e);
    res.send('Product not found!');
  }
});

app.get('/api/attributetypes', async (req, res) => {
  const attributeTypes = await AttributeType.findAll({
    include: [{ model: Attribute, as: 'attributes' }],
  });
  res.json(attributeTypes);
});

app.get('/api/attributes', async (req, res) => {
  const attributes = await Attribute.findAll();
  res.json(attributes);
});

app.listen(port, async () => {
  console.log(`listening on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// # IIFE for sync database
// (async () => {
//   await sequelize.drop();
//   console.log('All tables dropped!');
//   await sequelize.sync({ force: true, match: /_test$/ });
//   console.log('All models were synchronized successfully.');

//   const categories = await Category.bulkCreate(_mock.categories);
//   console.log(JSON.stringify(categories, null, 4));
//   const products = await Product.bulkCreate(_mock.products);
//   console.log(JSON.stringify(products, null, 4));
//   const attributeTypes = await AttributeType.bulkCreate(_mock.attributeTypes);
//   console.log(JSON.stringify(attributeTypes, null, 4));
//   const attributes = await Attribute.bulkCreate(_mock.attributes);
//   console.log(JSON.stringify(attributes, null, 4));
// })();
