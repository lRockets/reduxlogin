import express from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
let router = express.Router();

router.post('/',function(req,res){
    let { identifier,password }=req.body;
    User.find(
        {
            "$or" : [{email:identifier} , {username:identifier} ] 
        },function(err,data){
            if(data){
              
                bcrypt.compare(password, data[0].password_digest,function(err,isMatch){
                   
                    if (isMatch) {
                        
                        const token=jwt.sign({
                            id:data[0]._id,
                            username:data[0].username
                        },config.jwtSecret);

                        res.json({ token })

                    } else {
                        res.status(401).json({ errors:{ form:"Invalid Credentiais "}})
                    }
                })
            }else{
               res.status(401).json({ errors:{ form:"Invalid Credentiais "}})
            }
        }
    );
})
export default router;