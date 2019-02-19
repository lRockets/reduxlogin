import express from 'express';
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import Promise from 'bluebird';

let router = express.Router();

const commonValidateInput = (data) => {
    let errors = {};

    if (validator.isEmpty(data.username)) {
        errors.username = "用户名不能为空！";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "邮箱不能为空！";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "密码不能为空！";
    }

    if (validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = "确认密码不能为空！";
    }

    if(data.password !== data.passwordConfirmation){
        errors.passwordConfirmation = "密码与确认密码不一样！";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


const validateInput = (data, otherValidations) => {
    let { errors } = otherValidations(data);

    return Promise.all([
        User.find({username:data.username},function(err,docs){
            if(docs.length>0){
                errors.username='用户名已存在';
            }
        }),

        User.find({email:data.email},function(err,docs){
            if(docs.length>0){
                errors.email='邮箱已存在';
            }
        })
    ]).then(()=>{
        return {
            errors,
            isValid: isEmpty(errors)
        }
    })
}


router.post('/', (req, res) => {
    validateInput(req.body, commonValidateInput).then(({ errors, isValid }) => {
        if (isValid) {
            const { username, password, email } = req.body;
            const password_digest = bcrypt.hashSync(password, 10);

            User.create({username:username,password_digest:password_digest,email:email},function(error,data){
                if(error){
                    res.status(500).json({ errors: err });
                }else{
                    res.json({ success: true })
                }
            })
        }else{
            res.status(400).json(errors);
        }
    })
   
});



export default router;