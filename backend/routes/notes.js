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

//ROUTE 3: Update a Note using : PUT "/api/auth/updatenote" . Login required
router.put('/updatenote/:id',fetchuser,async(req,res)=>{
  const {title,description,tag}=req.body

  const newNote={};
  if(title){newNote.title=title}
  if(description){newNote.description=description}
  if(tag){newNote.tag=tag}

  //find the note to be updated
  let note=await Note.findById(req.params.id)
  if(!note){res.status(404).send("Not Found")}
  if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
  }
  note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
  res.json(note)
})


//ROUTE 4: Delete a Note using : DELETE "/api/auth/deletenote" . Login required
router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
        
    try {
        //find the note to be deleted
    let note=await Note.findById(req.params.id)
    if(!note){res.status(404).send("Not Found")}
    //Allow deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed")
    }

    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted",note:note})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occurred")
   
    }
    
  })
    

module.exports=router