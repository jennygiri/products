const {Pool} = require('pg')
const password = require('../config.js')

const db = new Pool({
    user: 'jennyg',
    host: 'localhost',
    database: 'SDC',
    password: password,
    port: 5432
})

const getProducts = (callback) => {
  db.query('SELECT * FROM products WHERE id < 11', 
  //change this 11 to depend on an input at some point
  callback)
}

const getStyles = (productId, callback) => {
  db.query(`SELECT * FROM styles WHERE "productId"=${productId}`, callback)
}

const getFeatures = (productId, callback) => {
  db.query(`SELECT * FROM features where "productId"=${productId}`)
}

const getSkus = (styleId, callback) => {
  db.query(`SELECT * FROM skus where "style_id"=${styleId}`)
}
//NOTE in db one is referred as styleId and the other is style_id
const getPhotos = (styleId, callback) => {
  db.query(`SELECT * FROM photos where "styleId"=${styleId}`)
}

module.exports = {
  getProducts: getProducts,
  getStyles: getStyles,
  getFeatures: getFeatures,
  getSkus: getSkus,
  getPhotos: getPhotos
}

