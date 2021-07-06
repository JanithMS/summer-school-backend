const express = require("express");
const Products = require("./Models")
require("./db");

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.post('/api/product', async (req, res) => {

  try{
    const product = new Products({
      description: req.body.description
    })

    await product.save();
    return res.status(201).send(product);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
})

app.get('/api/product', async (req, res) => {

  try {
    const products = await Products.find();

    return res.status(200).send(products);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
})

app.get('/api/product/:id', async (req, res) => {
  const _id = req.params.id;

  try{
    const product = await Products.findById(_id)

    if(!product) {
      return res.send(404).send({error : "No products found!"});
    }

    return res.status(200).send(product);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
})

app.patch('/api/product/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'starred']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  const _id = req.params.id;

  try{
    const products = await Products.findByIdAndUpdate(_id, req.body ,{ new: true, runValidators: true});

    if(!products) {
      return res.status(404).send({error : "No products found!"});
    }

    return res.status(200).send(products);
  } catch (e) {
    console.log(e);
    return res.status(500).send(e)
  }

})

app.listen(3001, () => console.log("listening on port 3001"))