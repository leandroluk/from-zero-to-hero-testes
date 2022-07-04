const listOfProduct = [
  {
    _id: new ObjectId(),
    description: 'Martelo do Thor',
    price: 100,
    unit: 'un'
  },
  {
    _id: new ObjectId(),
    description: 'Escudo do Capitao America',
    price: 85.70,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    description: 'Manopla do Thanos',
    price: 324.15,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    description: 'Armadura do Homem de Ferro',
    price: 753.25,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    description: 'Arco do Gaviao Arqueiro',
    price: 45.88,
    unit: 'un',
  },
];

const listOfSale = [
  {
    _id: new ObjectId(),
    seller_name: 'Anonymous',
    purchaser_name: 'Thanos',
  },
  {
    _id: new ObjectId(),
    seller_name: 'Wakanda',
    purchaser_name: 'Capitao America',
  },
];

const listOfSaleProduct = [
  {
    _id: new ObjectId(),
    sale_id: listOfSale[0]._id,
    product_id: listOfProduct[0]._id,
    description: 'Martelo do Thor',
    quantity: 1,
    price: 210.26,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    sale_id: listOfSale[0]._id,
    product_id: listOfProduct[1]._id,
    description: 'Escudo do Capitao America (V1)',
    quantity: 2,
    price: 98.10,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    sale_id: listOfSale[0]._id,
    product_id: listOfProduct[2]._id,
    description: 'Manopla do Thanos',
    quantity: 1,
    price: 554.15,
    unit: 'un',
  },
  {
    _id: new ObjectId(),
    sale_id: listOfSale[1]._id,
    product_id: listOfProduct[4]._id,
    description: 'Super Arco do Gaviao Arqueiro',
    quantity: 3,
    price: 57.66,
    unit: 'un',
  },
];

db.product.insertMany(listOfProduct);
db.sale.insertMany(listOfSale);
db.sale_product.insertMany(listOfSaleProduct);
