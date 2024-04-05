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
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{4}$/.test(v);
            },
            message: props => `${props.value} is not a valid 4-digit years!`
        }
    },
    Yrs: {
        type: Number,
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
        required: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+$/.test(v); // Validates that only alphabetic characters are present
            },
            message: props => `${props.value} can only contain alphabetic characters!`
        }
    },
    LName: {
        type: String,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z]+$/.test(v); // Validates that only alphabetic characters are present
            },
            message: props => `${props.value} can only contain alphabetic characters!`
        }
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
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{6}$/.test(v); // Checks if PinCode is a 6-digit number
            },
            message: props => `${props.value} is not a valid 6-digit PinCode!`
        }
    },
    Country: {
        type: String,
        required: true
    },
    MobNum: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v); // Checks if MobNum is a 10-digit number
            },
            message: props => `${props.value} is not a valid 10-digit Mobile Number!`
        }
    },
    AltMobNum: {
        type: Number,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v) || v === undefined; // Checks if AltMobNum is a 10-digit number or undefined
            },
            message: props => `${props.value} is not a valid 10-digit Mobile Number!`
        }
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
        type: Number
    },
    DaPurVal: {
        type: Number
    },
    KeySkus: {
        type: [String], // Changed to an array of strings for storing multiple selected options
        default: []
    },
    assigned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Leadservey = mongoose.model('Leadservey', leadserveySchema)

export default Leadservey