require('dotenv').config()
const express = require('express')
const app = express()
const port = 5001
const configureDB = require('./config/db')
const cors = require('cors')
configureDB()
const path = require('path')
const {checkSchema} = require('express-validator')


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const upload = require('./app/middlewares/multer')
const employeeValidationSchema = require('./app/validations/employee-validation')
const userValidationSchema =  require('./app/validations/user-validation')
const usersCltr = require('./app/controllers/userCltr')
const emplyoeCltr = require('./app/controllers/employeeCltr')
const authenticateUser = require('./app/middlewares/authentication')
const authorizeUser = require('./app/middlewares/authorize')




app.use(express.json())
app.use(cors())

app.post('/user/register', checkSchema(userValidationSchema) ,usersCltr.register)
app.post('/user/login', checkSchema(userValidationSchema),usersCltr.login)
app.get('/user/account', authenticateUser, usersCltr.account)

app.post('/employee/create', 
    authenticateUser, 
    authorizeUser(['admin']), 
    upload.single('image'), 
    checkSchema(employeeValidationSchema),emplyoeCltr.create
);
app.get('/employees', authenticateUser, emplyoeCltr.list)
app.get('/employee/:id', authenticateUser, emplyoeCltr.getEmployee)

app.put('/employee/update/:id',
    authenticateUser,
    authorizeUser(['admin']),
    upload.single('image'),
    checkSchema(employeeValidationSchema),
    emplyoeCltr.updateEmployee
);
app.delete('/employee/remove/:id', authenticateUser, authorizeUser(['admin']), emplyoeCltr.delete)

app.listen(port, () => {
    console.log('server running on port', port)
})