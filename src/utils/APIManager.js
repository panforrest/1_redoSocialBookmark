import superagent from 'superagent'

export default {      //SHOULD BE export default NOT module.exports =
    get: (endpoint, params, callback) => {
        superagent
        .get('/api/profile')      //SHOULD BE '/api/profile'
        .query(params)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if (err) {
            	callback(err, null)      //SHOULD BE callback(err, null)
            	return
            }
            callback(null, response.body)     //SHOULD BE callback(null, response.body) 
        })
    }
}
