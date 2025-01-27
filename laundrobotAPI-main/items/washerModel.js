import mongoose from 'mongoose'

const washerSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please enter a washer name"]
        },
        timeLeftUserInput: {
            type: Number,
            required: true,
            default: 0
        },
        endTime: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Washer = mongoose.model('Washer', washerSchema);

export default Washer;