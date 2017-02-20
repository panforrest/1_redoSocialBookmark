var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.post('/login', function(req, res, next){     //REMEMBER THIS IS .post() NOT .get()

    var credentials = req.body

    controllers.profile
    .find({email: credentials.email})
    .then(function(profiles){
    	if (profiles.length == 0) {
            res.json({
            	confirmation: 'fail',
            	message: 'Profile not found'
            })
            return
    	}
    	var profile = profiles[0]

    	//???

    })
    .catch(function(err){
    	res.json({
    		confirmation: 'fail',
    		message: err
    	})
    })


})

module.exports = router