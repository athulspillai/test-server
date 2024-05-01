import mongoose from "mongoose";

const leadserveyonlineSchema = new mongoose.Schema({
    leadserveyonlineid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    Communication: {
        type: String,
        required: true
    },
    BizName: {
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
                // Validate if the value is empty or contains only alphabetic characters and spaces
                return v === '' || /^[a-zA-Z\s]+$/.test(v);
            },
            message: props => `${props.value} can only contain alphabetic characters and spaces!`
        }
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
    EmailId: {
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
    assigned: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

const Leadserveyonline = mongoose.model('Leadserveyonline', leadserveyonlineSchema)

export default Leadserveyonline