const data = [{ id: 2, name: 'example' }]

const service = {
  getById(id) {
    const item = data.find((item) => item.id === id)
    if (!item) throw new Error()
    return item
  }
}

const controller = {
  getById(id) {
    const result = service.getById(id)
    return result
  }
}

module.exports = { service, controller }
