const express=require('express')
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const router=express.Router()

//create a User using : POST "/api/auth/" . Doesn't require Authentication
router.post('/',[
    body('name','Enter a valid Name Min 3 characters').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail().toLowerCase(),
    body('password').isLength({min:5})
],(req,res)=>{
   // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }).then(user => res.json(user))
   .catch(err=>{
       console.log(err)
       //message:err.message will show actual error but reveal the schema and user email id.
       res.json({error:'Please enter a unique value for email',message:err.message})
   })

})

module.exports=router