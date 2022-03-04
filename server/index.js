const express = require('express');
const app = express();
const db = require('./../database/index.js')
const port = 3200
const path = require('path')


app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json())

app.get('/products', (req, res) => {
  db.getProducts((error, response) => {
    if (error) {
      console.log('error in server')
      res.sendStatus(404)
    } else {
      res.status(200).send(response.rows)
    }
  })
})


app.get('/products/:productId/styles', (req, res) => {
  console.log('👀', req.params.productId)
  db.getStyles(req.params.productId, (error, response) => {
    if (error) {
      res.sendStatus(404)
    } else {
      res.status(200).send(response.rows)
    }
  })
})

app.get('/products/:productId', (req, res) => {
  db.getFeatures(req.params.productId, (error, response) =>{
    if (error) {
      res.sendStatus(404)
    } else {
      res.status(200).send(response.rows)
    }
  })
})

//get data for a specific product with its ID
//get all styles of the product with this ID


app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`)
})

