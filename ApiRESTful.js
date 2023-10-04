const express = require('express');
const app = express();

var products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99, description: 'Description for Product 1'},
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99, description: 'Description for Product 2'},
  { id: 3, name: 'Sony PlayStation 5', price: 499.99, description: 'Description for Product 3'},
  { id: 4, name: 'MacBook Pro 16', price: 2399.99, description: 'Description for Product 4'},
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99, description: 'Description for Product 5'},
];

app.use(express.json());
//get all products
app.get("/products", function(req, res) {
  res.json(products);
});
//get a specified product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});
//create a new product
app.post("/products", (req, res) =>{
    const Newproduct = req.body;
    
    Newproduct.id = products.length + 1;
    products.push(Newproduct);   //add the new product
    res.status(201).json(Newproduct);
})
//updating product by id
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex((p) => p.id === productId);
  
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };  //create a new product by combining the properties of two products
      res.json(products[index]);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
})
// delete a product by ID
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === productId);

    if (index !== -1) {
        products.splice(index, 1); // Use splice to remove the product at the found index
        res.status(204).send(); // Send a 204 No Content response
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

//port listen
app.listen(3000, () => {
    console.log('server is listening on http://localhost:3000');
});