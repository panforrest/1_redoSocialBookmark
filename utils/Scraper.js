//var superagent = require('superagent')
var cheerio = require('cheerio')
//var Promise = require('bluebird')

module.exports = {

    scrape: function(html, props){    //find: function(params){       
    	// return new Promise(function(resolve, reject){
	     //    superagent
		    // .get(url)
		    // .query(null)
		    // .set('Accept', 'text/html')
		    // // .end(params, function(err, response){
		    //     if (err){
		    //         reject(err)
		    //         return
		    //     }

		    //     var html = reponse.text
      //           var props = ['og:title', 'og:description', 'og:image']
                var metaData = {}     //DON'T FORGET var

                $ = cheerio.load(html)
                $('meta').each(function(i, meta){
                    if (meta.attribs != null) {
                        var attribs = meta.attribs
                        if (attribs.property != null) {
                            var prop = attribs.property
                            if (props.indexOf(prop) != -1) {
                                var key = prop.replace('og:','')
                                metaData[key] = attribs.content     //DON'T FORGET .content
                            }
                        }
                    }
                })
                return metaData
                // metaData['url'] = url
                // res.json({
                // 	confirmation: success,
                // 	results: metaData
                // })
		    // })    		
    	// })
    }
}