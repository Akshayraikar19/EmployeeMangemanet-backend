

const userValidationSchema = {
    username: {
        in : ['body'],
        exists: {
            errorMessage: 'username is required'
        },
        notEmpty: {
            errorMessage: 'username cannot be empty'
        },
        trim: true
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: {min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters'
        },
        trim: true 
    }
}

module.exports = userValidationSchema