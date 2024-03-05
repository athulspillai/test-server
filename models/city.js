import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    cityid: {
        type: String,
        required: true,
    },
    cityname: {
        type: String,
        required: true
    },
    stateid: {
        type: String,
        required: true,
    },
})

const City = mongoose.model('city', citySchema)

export default City