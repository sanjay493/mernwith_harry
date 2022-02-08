const express=require('express')
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const JWT_SECRET='NeverTrytoTellaLai'
//create a User using : POST "/api/auth/createuser" . Doesn't require Authentication
router.post('/createuser',[
    body('name','Enter a valid Name Min 3 characters').isLength({min:3}),
    body('email', 'Enter a valid Email').isEmail().toLowerCase(),
    body('password').isLength({min:5})
],async(req,res)=>{
   // If there are errors, return Bad request and errors
    // Finds the validation errors in this request and wraps them in an object with handy functions
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
  
  try{
      // check whether the email exit
      //search email from exiting database
  let user=await User.findOne({email:req.body.email})
  if(user){
      return res.status(400).json({error:"Sorry a user with this email already exists"})
  } 
  //create a secure password with bcrypt which is async function
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt)
  //Create user
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass,
  })
  const data={
      id:user.id
  }
  const authToken=jwt.sign(data,JWT_SECRET)
 
  res.json(authToken)
  }catch (error){
      console.error(error.message)
      res.status(500).send("Some error occurred")
  }
})

//Login User using : POST "/api/auth/login" . Doesn't require Authentication
router.post('/login',[
 body('email', 'Enter a valid Email').isEmail().toLowerCase(),
  body('password','password can not be empty').exists(),
],async(req,res)=>{
 // If there are errors, return Bad request and errors
  // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
const {email,password}=req.body
try{
    // check whether the email exit
    //search email from exiting database
let user=await User.findOne({email})
if(!user){
    return res.status(400).json({error:"Enter a valid Credentails"})
} 
//create a secure password with bcrypt which is async function
const passwordCompare=await bcrypt.compare(password,user.password)
if(!passwordCompare){
  return res.status(400).json({error:"Enter a valid Credentails"})
} 
const data={
    id:user.id
}
const authToken=jwt.sign(data,JWT_SECRET)

res.json(authToken)
}catch (error){
    console.error(error.message)
    res.status(500).send("Some error occurred")
}
})

module.exports=router