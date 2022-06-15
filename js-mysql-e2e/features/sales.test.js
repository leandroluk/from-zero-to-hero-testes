const chai = require('chai')
const chaiHttp = require('chai-http')
const { faker } = require('@faker-js/faker')
const { db, runSeed } = require('./helpers')

chai.use(chaiHttp)

const { expect } = chai

const baseUrl = 'http://localhost:13000'

describe('sales', () => {
  beforeEach(async () => await runSeed())

  it('should lista ll available sales and return with status 200', async () => {
    const sql = `
      SELECT
        id,
        seller_name AS sellerName,
        purchaser_name AS purchaserName
      FROM db.sale
    `

    const [rows] = await db.query(sql)

    const res = await chai
      .request(baseUrl)
      .get('/api/sales')

    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(rows)
  })

  it('should get product with id = 1 and return with status 200', async () => {
    const saleSql = `
      SELECT
        id,
        seller_name AS sellerName,
        purchaser_name AS purchaserName
      FROM db.sale
      WHERE id = 1
    `
    const saleProductSql = `
      SELECt 
        id,
        sale_id AS saleId, 
        product_id AS productId,
        description, 
        quantity, 
        price, 
        unit
      FROM db.sale_product
      WHERE sale_id = 1
    `
    const [[sale]] = await db.query(saleSql)
    const [saleProducts] = await db.query(saleProductSql)
    sale.products = saleProducts

    const res = await chai
      .request(baseUrl)
      .get('/api/sales/1')

    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(sale)
  })

  it('should add sale to database and return with status 201', async () => {
    const nextIdSql = `
      SELECT MAX(id) + 1 as nextId 
      FROM db.sale
    `

    const [[{ nextId }]] = await db.query(nextIdSql)

    const addSale = {
      sellerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      purchaserName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      products: [
        {
          id: 1,
          description: faker.commerce.product(),
          quantity: Number(faker.commerce.price(1, 5, 0)),
          price: Number(faker.commerce.price(0, 300, 2)),
          unit: faker.name.findName().slice(0, 2).toLowerCase()
        }
      ]
    }

    const res = await chai
      .request(baseUrl)
      .post('/api/sales')
      .send(addSale)

    expect(res.status).to.equal(201)
    expect(res.body.id).to.equal(nextId)
    expect(res.body.sellerName).to.equal(addSale.sellerName)
    expect(res.body.purchaserName).to.equal(addSale.purchaserName)
    expect(res.body.products[0].description).to.equal(addSale.products[0].description)
    expect(res.body.products[0].quantity).to.equal(addSale.products[0].quantity)
    expect(res.body.products[0].price).to.equal(addSale.products[0].price)
    expect(res.body.products[0].unit).to.equal(addSale.products[0].unit)

    const checkInsertedSaleSql = `
      SELECT * 
      FROM db.sale
      WHERE
        seller_name = ? AND
        purchaser_name = ?
    `
    const [[insertedSale]] = await db.query(checkInsertedSaleSql, [
      addSale.sellerName,
      addSale.purchaserName
    ])

    expect(insertedSale).to.ok

    const checkInsertedSaleProductSql = `
      SELECT *
      FROM db.sale_product
      WHERE
        sale_id = ? AND
        description = ? AND
        quantity = ? AND
        price = ? AND
        unit = ?
    `

    const [[insertedSaleProduct]] = await db.query(checkInsertedSaleProductSql, [
      nextId,
      addSale.products[0].description,
      addSale.products[0].quantity,
      addSale.products[0].price,
      addSale.products[0].unit,
    ])

    expect(insertedSaleProduct).to.ok
  })

  it('should edit sale with id = 1, removing recreating products and return status 200', async () => {
    const saleSql = `
      SELECT 
        id,
        seller_name AS sellerName,
        purchaser_name as purchaserName
      FROM db.sale
      WHERE id = 1
    `
    const [[prevSale]] = await db.query(saleSql)

    const saleProductSql = `
      SELECT 
        id, 
        sale_id AS saleId, 
        product_id as productId,
        description,
        quantity, 
        price, 
        unit
      FROM db.sale_product
      WHERE sale_id = 1
    `

    const [prevSaleProducts] = await db.query(saleProductSql)

    const editSale = {
      sellerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      purchaserName: `${faker.name.firstName()} ${faker.name.lastName()}`,
      products: [
        {
          id: 1,
          description: faker.commerce.product(),
          quantity: prevSaleProducts[0].quantity + 1,
          price: prevSaleProducts[0].price + 1,
          unit: prevSaleProducts[0].unit.toUpperCase()
        }
      ]
    }

    const res = await chai
      .request(baseUrl)
      .put('/api/sales/1')
      .send(editSale)

    expect(res.status).to.equal(200)
    expect(res.body.sellerName).to.equal(editSale.sellerName)
    expect(res.body.purchaserName).to.equal(editSale.purchaserName)
    expect(res.body.products[0].productId).to.equal(editSale.products[0].id)
    expect(res.body.products[0].saleId).to.equal(1)
    expect(res.body.products[0].description).to.equal(editSale.products[0].description)
    expect(res.body.products[0].quantity).to.equal(editSale.products[0].quantity)
    expect(res.body.products[0].price).to.equal(editSale.products[0].price)
    expect(res.body.products[0].unit).to.equal(editSale.products[0].unit)

    const [[nextSale]] = await db.query(saleSql)
    const [nextSaleProducts] = await db.query(saleProductSql)

    expect(nextSale.sellerName).not.equal(prevSale.sellerName)
    expect(nextSale.purchaserName).not.equal(prevSale.purchaserName)
    expect(prevSaleProducts[0].id).not.equal(nextSaleProducts[0].id)
    expect(prevSaleProducts[0].description).not.equal(nextSaleProducts[0].description)
    expect(prevSaleProducts[0].quantity).not.equal(nextSaleProducts[0].quantity)
    expect(prevSaleProducts[0].price).not.equal(nextSaleProducts[0].price)
    expect(prevSaleProducts[0].unit).not.equal(nextSaleProducts[0].unit)
  })

  it('should remove sale_product if sale is removed and return status 204', async () => {
    const res = await chai
      .request(baseUrl)
      .delete('/api/sales/1')

    expect(res.status).to.equal(204)

    const saleSql = `
      SELECT id
      FROM db.sale
      WHERE id = 1
    `
    const [[nextSale]] = await db.query(saleSql)

    expect(nextSale).to.undefined

    const saleProductsSql = `
      SELECT id
      FROM db.sale_product
      WHERE sale_id = 1
    `

    const [[nextSaleProduct]] = await db.query(saleProductsSql)

    expect(nextSaleProduct).to.undefined
  })
})
