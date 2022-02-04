const express=require('express')
const router=express.Router()

router.get('/1',(req,res)=>{
    obj={
        a:'this',
        number:34
    }
    res.json(obj)
})

module.exports=router