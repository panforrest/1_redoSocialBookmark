import superagent from 'superagent'

export default {      //SHOULD BE export default NOT module.exports =
    get: (endpoint, params, callback) => {
        superagent
        .get(endpoint)      
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
            	callback(err, null)      //SHOULD BE callback(err, null)
            	return
            }
            callback(null, response.body)     //SHOULD BE callback(null, response.body) 
        })
    },

    post: (endpoint, params, callback) => {
        superagent
        .post(endpoint)                    //THIS SHOULD NOT BE get
        .send(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err){
                callback(err, null)       //SHOULD NOT BE callback(null, err)
                return
            }

        console.log('APIManager: '+JSON.stringify(response.body))
        const confirmation = response.body.confirmation
        if (confirmation != 'success'){
            callback({message: response.body.message}, null)
            return
        }

        callback(null, response.body)      //IT IS CRITICAL TO HAVE response.body, NOT response IN HERE
        })
    }
}
