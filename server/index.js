const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ orders: [], counter: 1 })
  .write()

app.get('/orders', (req, res) => {
  const orders = db.get('orders');
  res.send(orders);
});

app.post('/orders', (req, res) => {
  const data = req.body;
  const orderId = db.get('counter').value();
  db.set('counter', orderId + 1).write();
  db.get('orders')
    .push({ orderId, items: data.items })
    .write();

  return res.send({ orderId });
});

app.delete('/order/:id', (req, res) => {
  const id = req.params.id;
  const order = db
    .get('orders')
    .find({ orderId: Number(id) });

  if (!order) {
    return res
      .status(400)
      .send({ error: { message: `Order id ${id} does not exist` } });
  }

  db.get('orders')
    .remove({ orderId: Number(id) })
    .write()

  res.send({ ok: true });
});


app.listen(port, () => console.log(`Server listening on port ${port}.`));
