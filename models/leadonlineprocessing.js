import mongoose from "mongoose";

const leadonlineprocessingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    leadonlineSurveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leadserveyonline',
        required: true
    },
    leadonlineserveyDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    interested: {
        type: Boolean,
        default: false
    },
    notInterested: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

const Leadonlineprocessing = mongoose.model('Leadonlineprocessing', leadonlineprocessingSchema)

export default Leadonlineprocessing