const Employee = require('../models/emplyoe-model')
const { validationResult} = require('express-validator')
const emplyoeCltr={}


emplyoeCltr.create = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobileNo, designation, gender, course } = req.body;

    try {
        // Create a new employee object
        const employee = new Employee({
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            userId: req.user.id, 
            image: req.file ? req.file.path : null, // Handle file upload
        });

        
        await employee.save();

       
        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


emplyoeCltr.list = async(req,res) =>{
    try{
        const employees= await Employee.find()
        res.json(employees)
    }catch(err) {
        console.log(err)
        res.status(500).json({message: 'server error'})
    }
}

emplyoeCltr.getEmployee = async(req, res) => {
    try{
        const employee = await Employee.findById(req.params.id)
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch(err) {
        console.log(err) 
        res.status(500).json('something went wrong')
    }
}

emplyoeCltr.updateEmployee = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobileNo, designation, gender, course } = req.body;
    const id = req.params.id;  
    const image = req.file ? req.file.path : null; 

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            { name, email, mobileNo, designation, gender, course, image },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

emplyoeCltr.delete = async(req, res) => {
    try{
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if(!employee) {
            return res.status(404).json({message: 'employee not found'})
        }
        res.json({message: 'employee deleted successfully'})
    }catch(err) {
        console.log(err)
        res.status(500).json({message: 'something went wrong'})
    }
}



module.exports = emplyoeCltr

