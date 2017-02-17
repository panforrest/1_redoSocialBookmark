var mongoose = require('mongoose')

BookmarkSchema = new mongoose.Schema({
	profile:{type:String, default:''},
	url:{type:String, trim:true, default:''},
	title:{type:String, trim:true, default:''},
	description:{type:String, time:true, default:''},
	image:{type:String, default:''},
	timestamp:{type:String, default:Date.now}
})

module.exports = mongoose.model('BookmarkSchema', BookmarkSchema)