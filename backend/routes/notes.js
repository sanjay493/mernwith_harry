const express=require('express')
const router=express.Router()
const fetchuser =require('../middleware/fetchuser')
const Note= require('../models/Note')
const { body, validationResult } = require('express-validator');

//ROUTE 1: Get all the Notes using : GET "/api/auth/getuser" . Login required
router.get('/fetchallnotes',fetchuser,async(req,res)=>{
    try {
        const notes=await Note.find({user:req.user.id})
        res.json(notes) 
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occurred")
   
    }
    
})

//ROUTE 2: Add a new Note using : POST "/api/auth/addnote" . Login required
router.post('/addnote',fetchuser,[
    body('title','Enter a Min 3 characters title').isLength({min:3}),
    body('description', 'Enter  Description').isLength({min:10}),
    body('tag', 'Enter a valid tag').isLength({min:3}),
    
],async(req,res)=>{

    try {
        const {title,description,tag}=req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const note=new Note({
        title,description,tag,user:req.user.id
  })
   const saveNote=await note.save()

    res.json(saveNote)
    } catch (error) {
        console.error(error.message)
      res.status(500).send("Some error occurred")
 
    }
 
})

module.exports=router