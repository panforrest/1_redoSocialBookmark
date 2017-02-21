var express = require('express');
var router = express.Router();
var controllers = require('../controllers')
// var bcrypt = require('bcryptjs')

router.post('/:resource', function(req, res, next){
    var resource = req.params.resource

    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource'
        })

        return
    }

    controller.create(req.body)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            message: err
        })
    })


})

router.get('/:resource', function(req, res, next) {
    var resource = req.params.resource

    var controller = controllers[resource]

    if (controller == null) {
        res.json({
        	confirmation: 'fail',
        	message: 'invalid resource'
        })

        return
    }

    controller.find(req.query, false)
    .then(function(entities){
        res.json({
            confirmation: 'success',
            results: entities       //WAS resource: entities
        })    	
    })
    .catch(function(err){
    	res.json({
    		confirmation: 'fail',
    		message: err
    	})
    })
});
router.get('/:resource/:id', function(req, res, next){

    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'invalid resource'
        })

        return
    }

    var id = req.params.id
    controller.findById(id)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            resource: resource+' '+id+' not found'
        })
    })
})




module.exports = router;