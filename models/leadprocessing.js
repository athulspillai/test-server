import mongoose from "mongoose"

const leadprocessingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    leadSurveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leadservey',
        required: true
    },
    leadserveyDetails: {
        type: mongoose.Schema.Types.Mixed, // Store the lead survey details as a nested object
        required: true
    },
    interested: {
        type: Boolean,
        default: false
    },
    notInterested: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Leadprocessing = mongoose.model('Leadprocessing', leadprocessingSchema)

export default Leadprocessing