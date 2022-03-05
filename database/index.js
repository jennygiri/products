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
  const photosQuery = `(SELECT json_agg(pics) FROM (SELECT photos.url, photos.thumbnail_url FROM photos where "style_id"= s.id) AS pics) AS photos`
  
  
  
  
  const skusQuery = `(SELECT json_agg(skus) FROM (SELECT skus.quantity, skus.size FROM skus where "style_id"= s.id) AS skus) AS skus`
  
  const newSkusQuery = `(SELECT json_build_object(
    'skus', json_build_object(
      sk.id, json_build_object(
        'quantity', sk.quantity,
        'size', sk.size
      )
    ) AS skus FROM skus sk WHERE sk.style_id = s.id
  ))`
  
  const BJs = `(SELECT json_object_agg(s.id, json_build_object('quantity', s.quantity, 'size', s.size)) as skus FROM skus s WHERE s.style_id = s.id)`
  
  
  
  const resultsQuery = `(SELECT * FROM (SELECT s.id, s.product_id, s.name, s.sale_price, s.original_price, s.default_style, ${photosQuery}, ${BJs} FROM styles AS s) AS stys where product_id=${productId})`
  //db.query(`select json_build_object('results', array_agg(row_to_json(${resultsQuery}))) from styles s where s.product_id=1`, callback)
  db.query(resultsQuery, callback)
  //db.query(`SELECT json_build_object('product_id', ${productId}, 'results', array_agg(row_to_json(main)))
  //FROM (
  //  SELECT s.id, s.name, s.sale_price, s.original_price, s.default_style, 
  //  (
  //    SELECT array_to_json(array_agg(row_to_json(sub)))
  //    FROM (
  //      SELECT ph.thumbnail_url, ph.url 
  //      FROM photos ph 
  //      WHERE s.id = style_id
  //    ) sub
  //  ) as photos, (SELECT json_object_agg(s.id, json_build_object('quantity', s.quantity, 'size', s.size)) as skus FROM skus s WHERE s.style_id = 5)
  //  FROM styles s
  //  WHERE s.product_id = ${productId}
  //  ) main`, callback)
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

/*
  const photosQuery = `(select json_agg(pics) from (select photos.url, photos.thumbnail_url from photos where "styleId"= s.id) as pics) as photos`
  const skusQuery = `(select json_agg(sku) from (select skus.quantity, skus.size from skus where "style_id"= s.id) as sku) as skus from styles as s`
  db.query(`select row_to_json(stys) as results from (select s.id, s.product_id, s.name, s.sale_price, s.original_price, s.default_style, ${photosQuery}, ${skusQuery}) stys where product_id=${productId}`, callback)
*/

/*
`SELECT json_build_object('product_id', ${productId}, 'results', array_agg(row_to_json(main)))
FROM (
  SELECT s.id, s.name, s.sale_price, s.original_price, s.default_style, 
  (
    SELECT array_to_json(array_agg(row_to_json(sub)))
    FROM (
      SELECT ph.thumbnail_url, ph.url 
      FROM photos ph 
      WHERE s.id = styleId
    ) sub
  ) as photos, (SELECT json_object_agg(sk.id, json_build_object('quantity', s.quantity, 'size', s.size)) as skus FROM skus s WHERE s.style_id = 5)
  FROM styles s
  WHERE s.product_id = ${productId}
  ) main`
*/

//, 