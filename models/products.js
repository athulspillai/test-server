import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    productid: {
        type: String,
        required: true
    },
    productcode: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    categoryid: {
        type: String,
        required: true
    },
    subcategoryid: {
        type: String,
        required: true
    },
    packingid: {
        type: String,
        required: true
    },
})

const Products = mongoose.model('Products', productsSchema)

export default Products