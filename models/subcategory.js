import mongoose from "mongoose"

const subcategorySchema = new mongoose.Schema({
    subcategoryid: {
        type: String,
        required: true,
    },
    subcategoryname: {
        type: String,
        required: true,
    },
    categoryid: {
        type: String,
        required: true,
    },
})

const Subcategory = mongoose.model('Subcategory', subcategorySchema)

export default Subcategory