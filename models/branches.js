import mongoose from 'mongoose'

const branchesSchema = new mongoose.Schema({
    branchid: {
        type: String,
        required: true
    },
    branchname: {
        type: String,
        required: true
    },
})

const Branches = mongoose.model('branches', branchesSchema)

export default Branches