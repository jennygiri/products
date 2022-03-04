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
  const photosQuery = `(select json_agg(pics) from (select photos.url, photos.thumbnail_url from photos where "styleId"= s.id) pics) as photos`
  const skusQuery = `(select json_agg(sku) from (select skus.quantity, skus.size from skus where "style_id"= s.id) sku) as skus from styles as s`
  db.query(`select row_to_json(stys) as styles from (select s.id, s.product_id, s.name, s.sale_price, s.original_price, s.default_style, ${photosQuery}, ${skusQuery}) stys where product_id=${productId}`, callback)
}

const getFeatures = (productId, callback) => {
  db.query(`select row_to_json(prods) as products from (select p.id, p.name, p.slogan, p.description, p.category, p.default_price, (select json_agg(feat) from (select * from features where "product_id"= p.id) feat) as features from products as p) prods where id=${productId}`, callback)
}

const getSkus = (styleId, callback) => {
  db.query(`SELECT * FROM skus where "style_id"=${styleId}`, callback)
}
//NOTE in db one is referred as styleId and the other is style_id
const getPhotos = (styleId, callback) => {
  db.query(`SELECT * FROM photos where "styleId"=${styleId}`, callback)
}

module.exports = {
  getProducts: getProducts,
  getStyles: getStyles,
  getFeatures: getFeatures,
  getSkus: getSkus,
  getPhotos: getPhotos
}

