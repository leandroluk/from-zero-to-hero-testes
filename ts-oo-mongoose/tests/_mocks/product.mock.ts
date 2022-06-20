export const invaliParamIdList = [
  'a',
  '-1',
  '0',
  '1.1',
];

export const invalidEditProductList = [
  {
    description: 1,
  }, // invalid "description" number
  {
    description: true,
  }, // invalid "description" boolean
  {
    price: 'a',
  }, // invalid "price" string
  {
    price: true,
  }, // invalid "price" boolean
  {
    unit: 1,
  }, // invalid "unit" number
  {
    unit: true,
  }, // invalid "unit" boolean
];

export const invalidAddProductList = [
  {
    price: 1, unit: 'a',
  }, // missing "description"
  {
    description: 'a', unit: 'a',
  }, // missing "price"
  {
    description: 'a', price: 1,
  }, // missing "unit"
  {
    description: 1, price: 1, unit: 'a',
  }, // invalid "description" (number)
  {
    description: true, price: 1, unit: 'a',
  }, // invalid "description" (boolean)
  {
    description: 'a', price: 'a', unit: 'a',
  }, // invalid "price" (string)
  {
    description: 'a', price: true, unit: 'a',
  }, // invalid "price" (boolean)
  {
    description: 'a', price: 1, unit: 1,
  }, // invalid "unit" (number)
  {
    description: 'a', price: 1, unit: true,
  }, // invalid "unit" (boolean)
];
