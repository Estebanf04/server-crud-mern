import mongoose, {Schema} from "mongoose";

interface IEmployee{
    name: string
    surname: string
    email: string
    phone: string
    job: string
    contractHours: number
}

const EmployeeSchema : Schema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        trim: true
    },
    job: {
        type: String,
        required: true,
        trim: true
    },
    contractHours: {
        type: Number,
        required: true,
    }

}, {timestamps: true})

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema)
export default Employee