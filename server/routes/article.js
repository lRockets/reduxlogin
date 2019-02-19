import express from 'express';
import Article from '../models/article';
let router=express.Router();

router.post('/',function(req,res){
    Article.create(req.body,function(){
        res.json({ success:true })
    })
})


router.get('/list',function(req,res){
    Article.find({},function(err,data){
        if(err){
            res.json({ error: '后端出问题'})
        }else{
            res.json({ list:data })
        }
        
    })
})

router.get('/detail/:id',function(req,res){
   Article.find({id:req.params.id},function(err,data){
       if(data){
            res.json({data:data})
       }
   })
})


export default router;