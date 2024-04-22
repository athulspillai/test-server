
import mongoose from 'mongoose';


const prospectSchema = new mongoose.Schema({
    leadSurveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leadservey', // Reference to the Leadservey model
        required: true
    },
    username: {
        type: String,
        required: true
    },
    leadDetails: {
        type: mongoose.Schema.Types.Mixed, // Adjust the type according to your lead details structure
        required: true
    },
    interested: {
        type: Boolean,
        default: true // Set to true as these are interested prospects
    },
    createdAt: {
        type: Date,
        default: Date.now // Default to the current timestamp
    }
});


const Prospect = mongoose.model('Prospect', prospectSchema);


export default Prospect;
