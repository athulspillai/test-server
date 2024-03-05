import mongoose from "mongoose"

const packingSchema = new mongoose.Schema({
    packingid: {
        type: String,
        required: true,
    },
    packingname: {
        type: String,
        required: true,
    }
})

const Packing = mongoose.model('Packing', packingSchema)

export default Packing