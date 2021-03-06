var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var utils = require('../utils')

router.post('/register', function(req, res, next){   //THE N'TH TIME TO FORGET post
    var credentials = req.body   //NOT redentials = query.body

    controllers.profile
    .create(credentials)      //NOT create(profile)

    .then(function(profile){
        var token = utils.JWT.sign({id: profile.id}, process.env.TOKEN_SECRET)
        req.session.token = token
        res.json({
            confirmation: 'success',
            profile: profile,      //NOt result: profile
            token: token          //DON'T FORGET
        })
    })
    .catch(function(err){      //NOT .cacthc(function(err){
        res.json({
            confirmation: 'fail',
            message: err.message || err
        })
    })
})














router.get('/:action', function(req, res, next){
	var action = req.params.action

	if (action == 'logout') {
		req.session.reset()     //NOT req.session.end
        res.json({
        	confirmation: 'log out success'
        })
        return
	}

	if (action == 'currentuser') {
        if (req.session == null) {
        	res.json({
        		confirmation: 'success',
        		message: 'User not logged in, no session'
        	})
        	return
        }

        if (req.session.token == null) {
        	res.json({
        		confirmation: 'success',
        		message: 'User not logged in, no token'
        	})
        	return
        }

        var token = req.session.token
        utils.JWT.verify(token, process.env.TOKEN_SECRET)
        // var token = req.session.token
        .then(function(decode){
        	// res.json({
        	// 	confirmation: 'success',
        	// 	// token: decode
        	// 	profile: profile
        	// })
        	return controllers.profile.findById(decode.id)
        })
        .then(function(profile){
        	res.json({
        		confirmation: 'success',
        		profile: profile
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