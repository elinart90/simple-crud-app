const { Timestamp } = require('mongodb')
const mongoosse = require('mongoose')

const productSchema = mongoosse.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"]
        },

        quantity: {
            type:Number, 
            required: true,
            default: 0,
        }, 
    
        price: {
            type: Number, 
            required: true, 
            default: 0,
        },
    
        image: {
            type : String,
            required: false,
        },
    },
    
    {
        Timestamp: true,
    }
);

const Product = mongoosse.model("product", productSchema)

module.exports = Product;
