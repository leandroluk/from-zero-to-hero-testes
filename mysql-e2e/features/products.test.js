const chai = require('chai')
const chaiHttp = require('chai-http')
const { faker } = require('@faker-js/faker')
const { db, runSeed } = require('./helpers')

chai.use(chaiHttp)

const { expect } = chai

const baseUrl = 'http://localhost:13000'

describe('products', () => {
  beforeEach(async () => await runSeed())

  it('should list all available products and return with status 200', async () => {
    const sql = `
      SELECT 
        id,
        description,
        price,
        unit 
      FROM db.product
    `
    const [rows] = await db.query(sql)

    const res = await chai
      .request(baseUrl)
      .get('/api/products')

    expect(res.status).to.equal(200)
    expect(res.body).to.deep.equal(rows)
  })

  it('should get product with id = 1 and return with status 200', async () => {
    const sqlProduct1 = `
      SELECT
        id,
        description,
        price,
        unit
      FROM db.product
      WHERE id = 1
    `

    const [[row]] = await db.query(sqlProduct1)

    const res = await chai
      .request(baseUrl)
      .get('/api/products/1')

    expect(res.status).to.equal(200)
    expect(res.body.id).to.equal(1)
    expect(res.body.description).to.equal(row.description)
    expect(res.body.price).to.equal(row.price)
    expect(res.body.unit).to.equal(row.unit)
  })

  it('should add product to database and return with status 201', async () => {
    const nextIdSql = `
      SELECT MAX(id) + 1 as nextId 
      FROM db.product
    `

    const [[{ nextId }]] = await db.query(nextIdSql)

    const addProduct = {
      description: faker.commerce.product(),
      price: Number(faker.commerce.price(1, 300, 2)),
      unit: faker.commerce.product().slice(0, 2).toLowerCase()
    }

    const res = await chai
      .request(baseUrl)
      .post('/api/products')
      .send(addProduct)

    expect(res.status).to.equal(201)
    expect(res.body.id).to.equal(nextId)
    expect(res.body.description).to.equal(addProduct.description)
    expect(res.body.price).to.equal(addProduct.price)
    expect(res.body.unit).to.equal(addProduct.unit)

    const checkInsertedProductSql = `
      SELECT * 
      FROM db.product 
      WHERE 
        description = ? AND
        price = ? AND
        unit = ?
    `
    const [[insertedProduct]] = await db.query(checkInsertedProductSql, [
      addProduct.description,
      addProduct.price,
      addProduct.unit
    ])

    expect(insertedProduct).to.ok
  })

  it('should edit product with id = 1 and return with status 200', async () => {
    const sqlProduct1 = `
      SELECT 
        id,
        description,
        price,
        unit
      FROM db.product
      WHERE id = 1
    `

    const [[prev]] = await db.query(sqlProduct1)

    const editProduct = {
      description: faker.commerce.product(),
      price: Number(faker.commerce.price(1, 300, 2)),
      unit: faker.commerce.product().slice(0, 2).toLowerCase()
    }

    const res = await chai
      .request(baseUrl)
      .put('/api/products/1')
      .send(editProduct)

    expect(res.status).to.equal(200)
    expect(res.body.id).to.equal(1)
    expect(res.body.description).to.equal(editProduct.description)
    expect(res.body.price).to.equal(editProduct.price)
    expect(res.body.unit).to.equal(editProduct.unit)

    const [[next]] = await db.query(sqlProduct1)

    expect(prev.description).not.equal(next.description)
    expect(prev.price).not.equal(next.price)
    expect(prev.unit).not.equal(next.unit)
  })

  it('should remove product with id = 1 and return with status 204', async () => {
    const sqlProduct1 = `
      SELECT id
      FROM db.product
      WHERE id = 1
    `
    const [[prev]] = await db.query(sqlProduct1)

    expect(prev).to.ok

    const res = await chai
      .request(baseUrl)
      .delete('/api/products/1')

    expect(res.status).to.equal(204)

    const [[next]] = await db.query(sqlProduct1)

    expect(next).to.undefined
  })
})
