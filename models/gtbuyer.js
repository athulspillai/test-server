import mongoose from "mongoose";

const gtbuyerSchema = new mongoose.Schema({
    gtbuyerid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: true
    },
    ownername: {
        type: String,
        required: true,
    },
    mobilenumber: {
        type: Number,
        required: true
    },
    emailid:{
        type: String,
        required:true
    },
    state:{
        type: String,
         required:true
    },
    city:{
        type: String,
        required:true
    },
    area:{
        type: String,
        required:true
    },
    
}, { timestamps: true })

const Gtbuyer = mongoose.model('Gtbuyer', gtbuyerSchema)

export default Gtbuyer