const mongoose=require('mongoose');
var UserSchema=mongoose.Schema({   //建立模型
	username:{
		type:String
	},
	email:{
		type:String
	},
	password_digest:{
		type:String
	}
})

 const User=mongoose.model('User',UserSchema,'user');
 export default User;