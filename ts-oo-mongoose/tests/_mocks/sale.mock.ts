export const invaliParamIdList = [
  'a',
  '-1',
  '0',
  '1.1',
];

export const invalidEditSaleList = [
  {
    sellerName: 1,
  }, // invalid "sellerName" number
  {
    sellerName: true,
  }, // invalid "sellerName" boolean
  {
    sellerName: ''.padStart(101, '0'),
  }, // invalid "sellerName" max 100
  {
    purchaserName: 1,
  }, // invalid "purchaserName" number
  {
    purchaserName: true,
  }, // invalid "purchaserName" boolean
  {
    purchaserName: ''.padStart(101, '0'),
  }, // invalid "purchaserName" max 100
  {
    products: 'a',
  }, // invalid "products" string
  {
    products: 1,
  }, // invalid "products" number
  {
    products: true,
  }, // invalid "products" number
  {
    products: {},
  }, // invalid "products" array
  {
    products: [],
  }, // invalid "products" min 1
  {
    products: ['a'],
  }, // invalid "products[0]" string
  {
    products: [1],
  }, // invalid "products[0]" number
  {
    products: [true],
  }, // invalid "products[0]" number
  {
    products: [{ description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].id"
  {
    products: [{ id: 1, quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].description"
  {
    products: [{ id: 1, description: 'a', price: 1, unit: 'a' }],
  }, // missing "products[0].quantity"
  {
    products: [{ id: 1, description: 'a', quantity: 1, unit: 'a' }],
  }, // missing "products[0].price"
  {
    products: [{ id: 1, description: 'a', quantity: 1, price: 1 }],
  }, // missing "products[0].unit"
  {
    products: [{ id: 'a', description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "products[0].id" string
  {
    products: [{ id: true, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].id" boolean
  {
    products: [{ id: 1, description: 1, quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].description" number
  {
    products: [{ id: 1, description: true, quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].description" string
  {
    products: [{ id: 1, description: 'a', quantity: 'a', price: 1, unit: 'a' }],
  }, // missing "products[0].quantity" string
  {
    products: [{ id: 1, description: 'a', quantity: true, price: 1, unit: 'a' }],
  }, // missing "products[0].quantity" boolean
  {
    products: [{ id: 1, description: 'a', quantity: 1, price: 'a', unit: 'a' }],
  }, // missing "products[0].price" string
  {
    products: [{ id: 1, description: 'a', quantity: 1, price: true, unit: 'a' }],
  }, // missing "products[0].price" boolean
  {
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 1 }],
  }, // missing "products[0].unit" number
  {
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: true }],
  }, // missing "products[0].unit" boolean
];

export const invalidAddSaleList = [
  {
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // missing "sellerName"
  {
    sellerName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // missing "purchaserName"
  {
    sellerName: 'a',
    purchaserName: 'a',
  }, // missing "products"
  {
    sellerName: 1,
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "sellerName" number
  {
    sellerName: true,
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "sellerName" boolean
  {
    sellerName: 'a',
    purchaserName: 1,
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "purchaserName" number
  {
    sellerName: 'a',
    purchaserName: true,
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "purchaserName" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: 'a',
  }, // invalid "products" string
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: 1,
  }, // invalid "products" number
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: true,
  }, // invalid "products" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: ['a'],
  }, // invalid "products[0]" string
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [1],
  }, // invalid "products[0]" number
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [true],
  }, // invalid "products[0]" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].id"
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, quantity: 1, price: 1, unit: 'a' }],
  }, // missing "products[0].description"
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', price: 1, unit: 'a' }],
  }, // missing "products[0].quantity"
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, unit: 'a' }],
  }, // missing "products[0].price"
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1 }],
  }, // missing "products[0].unit"
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 'a', description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "products[0].id" string
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: true, description: 'a', quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "products[0].id" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 1, quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "products[0].description" number
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: true, quantity: 1, price: 1, unit: 'a' }],
  }, // invalid "products[0].description" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 'a', price: 1, unit: 'a' }],
  }, // invalid "products[0].quantity" string
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: true, price: 1, unit: 'a' }],
  }, // invalid "products[0].quantity" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 'a', unit: 'a' }],
  }, // invalid "products[0].price" string
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: true, unit: 'a' }],
  }, // invalid "products[0].price" boolean
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: 1 }],
  }, // invalid "products[0].unit" number
  {
    sellerName: 'a',
    purchaserName: 'a',
    products: [{ id: 1, description: 'a', quantity: 1, price: 1, unit: true }],
  }, // invalid "products[0].unit" boolean 
];
