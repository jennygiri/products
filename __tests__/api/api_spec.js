const frisby = require('frisby');

const testingId = 1


it ('Styles GET should return a status of 200 OK', function () {
  return frisby
  .get(`http://localhost:3200/products/${testingId}/styles`)
  .expect('status', 200);
  //.inspectJSON()
});

it (`Product details GET should return a status of 200 OK`, function () {
  return frisby
  .get(`http://localhost:3200/products/${testingId}`)
  .expect('status', 200)
  //.inspectJSON()
});


it (`Product details GET at product 1000 should return a status of 200 OK (hopefully quickly)`, function () {
  return frisby
  .get(`http://localhost:3200/products/1000000`)
  .expect('status', 200)
  .inspectJSON()
});

it ('All products GET should work with a count parameter', function () {
  return frisby
  .get('http://localhost:3200/products/?count=1')
  .expect('status', 200)
});

it ('All products GET should work with a count of 1000', function () {
  return frisby
  .get('http://localhost:3200/products/?count=1000')
  .expect('status', 200)
  //.inspectJSON()
});

it ('All products GET should return a status of 200 OK', function () {
  return frisby
    .get('http://localhost:3200/products')
    .expect('status', 200);
    //.inspectJSON()
});