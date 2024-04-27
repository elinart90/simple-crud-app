const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/product.models.js')
const app = express()

app.use(express.json());

app.listen(3003, () => {
    console.log('server is running on port 3003')
})

app.get('/', (req, res)=>{
    res.send('hello')
}) 


// MIDDLEWARE
// app.use(expressljson());
// app.use(express.urlencoded({extended: false}))

//ROUTE
// app.use("/api/products", productRoute)


// GET ALL PRODOCTS
app.get('/api/products', async (req, res) =>{
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch(error){
        res.status(500).json({mssg: error.mssg})
    }
})


// GET A PRODUCT BY _ID
app.get('/api/products/:id', async (req, res ) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product) 
    }catch(error){
        res.status(500).json({mssg: error.mssg})
    }
})


// ADDING PRODOCTS TO THE COLLECTIONS
app.post('/api/products',async (req, res) =>{
    // console.log(req.body)
    // res.send('req.body')
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({mssg: error.mssg})
    }
    
})

// UPDATING PRODUCT
app.put('/api/products/:id', async (req, res) =>{
    try{
        const {id} = req.params;

       const product = await Product.findByIdAndUpdate(id,req.body)

       if(!product){
        return res.status(404).json({mssg: "product not found"})
       }
       const updateProduct = await Product.findById(id);
       res.status(200).json(updateProduct)

    }catch(error){
        res.status(500).json("mssg: error.mssg")
    }
})


//DELETE A PRODECT
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the product by ID
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});






mongoose.connect("mongodb+srv://nanakwadwonartey033:9u9M2p7iVKPoZqbe@cluster0.mx9gau3.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0" )
.then(() =>{
    console.log('connected to the database')
})
.catch(() =>{
    console.log('connection failed!')
})