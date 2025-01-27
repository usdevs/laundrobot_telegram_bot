import mongoose from 'mongoose'

const dryerSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please enter a dryer name"]
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

const Dryer = mongoose.model('Dryer', dryerSchema);

export default Dryer;