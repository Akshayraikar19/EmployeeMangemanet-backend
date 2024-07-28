const mongoose = require('mongoose')
const {Schema, model} = mongoose

const employeeSchema = new Schema({
    name: String,
    email: String,
    mobileNo: String,
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'], 
        required: true
    },
    course: {
        type: [String],
        enum: ['MCA', 'BCA', 'BSC'],
    },
    createDate: Date,
    image: {
        type:String
    }
} , {timestamps: true})

const Employee = model('Employee', employeeSchema)

module.exports = Employee