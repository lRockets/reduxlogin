const mongoose=require('mongoose');
var ArticleSchema=mongoose.Schema({   //建立模型
	title:{
		type:String
	},
	content:{
		type:String
	},
	id:{
		type:String
	},
	time:{
		type:String
	}
})

 const Article=mongoose.model('Article',ArticleSchema,'article');
 export default Article;