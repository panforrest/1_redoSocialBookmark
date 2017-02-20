var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var utils = require('../utils')

router.get('/:action', function(req, res, next){
	var action = req.params.action

	if (action == 'currentuser') {
        if (req.session == null) {
        	res.json({
        		confirmation: 'success',
        		message: 'User not logged in'
        	})
        	return
        }

        if (req.session.token == null) {
        	res.json({
        		confirmation: 'success',
        		message: 'User not logged in'
        	})
        	return
        }

        var token = req.session.token
        utils.JWT.verify(token, process.env.TOKEN_SECRET)
        // var token = req.session.token
        .then(function(decode){
        	res.json({
        		confirmation: 'success',
        		token: decode
        	})
        })
        .catch(function(err){
        	res.json({
                confirmation: 'fail',
                message: 'Invalid token'
        	})
        	return

        })
	}
})

router.post('/login', function(req, res, next){     //REMEMBER THIS IS .post() NOT .get()

    var credentials = req.body

    controllers.profile
    .find({email: credentials.email}, true)
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

    	//create a signed token
    	var token = utils.JWT.sign({id: profile._id}, process.env.TOKEN_SECRET)
    	req.session.token = token

    	res.json({
    		confirmation: 'success',
    		profile: profile.summary()
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