const express = require('express')
const products = require('./products')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded ({extended:true}))


app.get('/', (req, res)=>{
  res.send('HomePage');
})

app.get('/products', (req, res)=>{

  let {limit, skip}=req.query

    let results = products
    if(skip && skip>0){
      results=results.slice(skip)
    }

    if(limit && limit>0){
      results=results.slice(0, limit)
    }

    res.json(results)
})

app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const product = products.find(product => product.id === parseInt(id))

  if (!product) {
    return res.status(404).json({ error: `The id ${id} doesn't exist` })
  }

  res.json(product);
})


app.listen(PORT, ()=>{
  console.log(`Server is listening in port ${PORT}`)
})

