const {Pool} = require('pg')
const config = require('../config.js')

const db = new Pool({
    user: 'jennyg',
    host: 'localhost',
    database: 'SDC',
    password: config.password,
    port: 5432
})

const getProducts = (callback, count=10) => {
  db.query(`SELECT * FROM products WHERE id < ${count}`, 
  //change this 11 to depend on an input at some point
  callback)
}

const getStyles = (productId, callback) => {
  const photosQuery = `(SELECT json_agg(pics) FROM (SELECT photos.url, photos.thumbnail_url FROM photos where "style_id"= s.id) AS pics) AS photos`
  
  const skusQuery = `(SELECT json_object_agg(sk.id, json_build_object('quantity', sk.quantity, 'size', sk.size)) AS skus FROM skus sk WHERE sk.style_id = s.id)`
  
  const resultsQuery = `(SELECT * FROM (SELECT s.id, s.product_id, s.name, s.sale_price, s.original_price, s.default_style, ${photosQuery}, ${skusQuery} FROM styles AS s) AS stys where product_id=${productId})`

  db.query(resultsQuery, callback)
}

const getFeatures = (productId, callback) => {
  db.query(`select row_to_json(prods) as products from (select p.id, p.name, p.slogan, p.description, p.category, p.default_price, (select json_agg(feat) from (select features.feature, features.value from features where "product_id"= p.id) feat) as features from products as p) prods where id=${productId}`, callback)
}

module.exports = {
  getProducts: getProducts,
  getStyles: getStyles,
  getFeatures: getFeatures,
}