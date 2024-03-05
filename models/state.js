import mongoose from "mongoose"

const stateSchema = new mongoose.Schema({
    stateid:{
        type: String,
        required: true
    },
    statename: {
        type: String,
        required: true
    },
})

const State = mongoose.model('state', stateSchema)

export default State