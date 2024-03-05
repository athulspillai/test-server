import mongoose from 'mongoose';

const submoduleSchema = new mongoose.Schema({
    submoduleid: {
        type: String,
        required: true,
    },
    submodulename: {
        type: String,
        required:true,
    },
    moduleid: {
        type: String,
        required: true
    }
})

const Submodule = mongoose.model('Submodule', submoduleSchema)

export default Submodule
