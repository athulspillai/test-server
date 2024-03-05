import mongoose from 'mongoose'

const areaSchema = new mongoose.Schema({
    areaid: {
        type: String,
        required: true
    },
    areaname: {
        type: String,
        required: true
    },
    cityid: {
        type: String,
        required: true
    }
})

const Area = mongoose.model('area', areaSchema)

export default Area