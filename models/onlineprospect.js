import mongoose from "mongoose";

const onlineprospectSchema = new mongoose.Schema({
    leadonlineDetails: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Onlineprospect = mongoose.model('Onlineprospect', onlineprospectSchema);

export default Onlineprospect