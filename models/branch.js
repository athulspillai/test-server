import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    branchid: {
        type: String,
        required: true,
    },
    branchname: {
        type: String,
        required: true,
    },
  

});

const Branch = mongoose.model('Branch', branchSchema);

export default Branch;