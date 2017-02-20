var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')

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

    	var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)  //NOT passwordCompare
    	if (passwordCorrect == false) {              //NOT null
    		res.json({
    			confirmation: 'login failed',
    			message: 'Wrong password'
    		})
    		return
    	}

    	res.json({
    		confirmation: 'success',
    		profile: profile
    	})

    })
    .catch(function(err){
    	res.json({
    		confirmation: 'failed',
    		message: err
    	})
    })


})

module.exports = router