const Employee = require('../models/emplyoe-model')
const User = require('../models/user-model')

const employeeValidationSchema = {
    name : {
        in : ['body'],
        exists: {
            errorMessage: 'name is required'
        },
        notEmpty: {
            errorMessage: 'name cannot be empty'
        },
        trim: true
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: "email is required"
        },
        notEmpty: {
            errorMessage: 'email is required'
        },
        isEmail: {
            errorMessage: 'email should be a valid format'
        },
        custom: {
            options: async function(value) {
                const user = await User.findOne({ email: value}) // check in user model
                if(user) {
                    throw new Error('email already taken')
                } else {
                    return true 
                }
            }
        },
        trim: true,   // trim, normalize is sanitailzer, normailze is used to make all letters is small letter.
        normalizeEmail: true 
    },
    mobileNo: {
        in: ['body'],
        exists: {
            errorMessage: 'mobile is required'
        },
        notEmpty: {
            errorMessage: 'mobile cannot be empty'
        },
        isNumeric: {
            errorMessage: 'mobile should be a number'
        }, 
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'mobile should be 10 digits long'
        },
        custom: {
            options: async function(value){ // value provided by user.
                const employee = await Employee.findOne({ mobileNO: value})
                if(employee) {
                    throw new Error('MobileNo already exists')
                } else {
                    return true 
                }
            }
        },
        trim: true 
    },
    designation: {
        in: ['body'],
        exists: {
            errorMessage: 'designation is required'
        },
        notEmpty: {
            errorMessage: 'designation cannot be empty'
        },
        isIn: {
            options: [['HR', 'Manager', 'Sales']],
            errorMessage: 'Should be either of the HR,Manager, or Sales'
        }
    },
    // gender: {
    //     in: ['body'],
    //     exists: {
    //         errorMessage: 'gender is required'
    //     },
    //     notEmpty: {
    //         errorMessage: 'gender cannot be empty'
    //     },
    //     isIn: {
    //         options: [['M' , 'F']],
    //         errorMessage: 'Should be either of Male or Female'
    //     }
    // },
    course: {
        in: ['body'],
        exists: {
            errorMessage: 'course is required'
        },
        notEmpty: {
            errorMessage: 'course cannot be empty'
        },
        isIn: {
            options: [['MCA', 'BCA', 'BSC']],
            errorMessage: 'should be either of MCA, BCA, BSC'
        }
    }
}

module.exports = employeeValidationSchema