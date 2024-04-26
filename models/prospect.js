
import mongoose from 'mongoose';

const prospectSchema = new mongoose.Schema({
    leadDetails: {
        type: mongoose.Schema.Types.Mixed, // Adjust the type according to your lead details structure
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Default to the current timestamp
    }
});


const Prospect = mongoose.model('Prospect', prospectSchema);


export default Prospect;
