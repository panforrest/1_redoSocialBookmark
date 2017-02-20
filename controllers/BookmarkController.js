var Bookmark = require('../models/Bookmark')
var Promise = require('bluebird')
var utils = require('../utils')
var superagent = require('superagent')
 // var cheerio = require('cheerio')

module.exports = {

	find: function(params){
		return new Promise(function(resolve, reject){
			Bookmark.find(params, function(err, bookmarks){
				if (err){
					reject(err)
					return
				}
				resolve(bookmarks)
			})
		})
	},

	findById: function(id){
		return new Promise(function(resolve, reject){
			Bookmark.findById(id, function(err, bookmark){
				if (err){
					reject(err)
					return
				}
				resolve(bookmark)
			})
		})
	},

	// findById: function(id){
	// 	return new Promise(function(resolve, reject){
 //            Bookmark.findById(id, function(err, bookmark){
 //            	if (err){
 //            		reject(err)
 //            		return
 //            	}
 //            	resolve(bookmark)
 //            })
	// 	})
	// },

	create: function(params){
		return new Promise(function(resolve, reject){
            // if (err) {
            //     reject(err)
            //     return
            // }

            superagent
            .get(params.url)     //REMEMBER NOT TO MISS .url
            .query(null)
            .set('Accept', 'text/html')
            .end(function(err, response){      //THERE IS NO params.url IN FRONT OF function()
            	if (err) {
            		reject(err)
            		return
            	}

            	var html = response.text
            	var metaData = utils.Scraper.scrape(html, ['og:title', 'og:description', 'og:image', 'og:url'])

            	// res.json({
            	// 	confirmation: 'success',
            	// 	results: metaData
            	// })

	            Bookmark.create(metaData, function(err, bookmark){       //params.url IS REPLACED BY metaData
	            	if (err){
	            		reject(err)
	            		return
	            	}
	            	resolve(bookmark)
	            })            	

            })

            






            // Bookmark.create(params.url, function(err, bookmark){
            // 	if (err){
            // 		reject(err)
            // 		return
            // 	}
            // 	resolve(bookmark)
            // })
		})
	},
}