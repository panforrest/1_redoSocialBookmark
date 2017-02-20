var mongoose = require('mongoose')

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, default:''},
	lastName: {type:String, default:''},
	email: {type:String, default:''},
	password: {type:String, default:''},
	timestamp: {type:String, default:Date.now}
})

ProfileSchema.methods.summary = function(){
	var summary = {
		id: this._id.toString(),
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email,
		// password: this.password,
        timestamp: this.timestamp
	}

	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)