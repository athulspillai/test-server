import mongoose from "mongoose";

const leadserveySchema = new mongoose.Schema({
    leadserveyid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    CustName: {
        type: String,
        required: true
    },
    Since: {
        type: String,
        required: true,
    },
    Yrs: {
        type: String,
        required: true
    },
    BizType: {
        type: String,
        required: true
    },
    BizCatge: {
        type: String,
        required: true
    },
    FName: {
        type: String,
        required: true
    },
    LName: {
        type: String,
        required: true
    },
    Addr1: {
        type: String,
        required: true
    },
    Addr2: {
        type: String,
    },
    State: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    PinCode: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    MobNum: {
        type: Number,
        required: true
    },
    AltMobNum: {
        type: Number,
    },
    EmailId: {
        type: String,
        required: true
    },
    BizExp: {
        type: String,
        required: true
    },
    CurrAddSince: {
        type: String,
        required: true
    },
    BizHourFrom: {
        type: String,
        required: true
    },
    BizHourTo: {
        type: String,
        required: true,
    },
    ApproxQtyBuyinKg: {
        type: Number,
        required: true
    },
    DaPurVal: {
        type: Number,
        required: true
    },
    KeySkus: {
        type: String,
        required: true
    },
    assigned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Leadservey = mongoose.model('Leadservey', leadserveySchema)

export default Leadservey