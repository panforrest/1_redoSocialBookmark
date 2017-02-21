import React, { Component } from 'react'
import superagent from 'superagent'
import { APIManager } from '../../utils'

class Profiles extends Component {

    componentDidMount(){
    	// console.log('componentDidMount: ')
    	// superagent
    	// .get('/api/profile')
    	// .query(null)
    	// .set('Accept', 'applicaiton/json')
    	// .end((err, response) => {
    	// 	if (err) {
    	// 		const msg = err.message || err
    	// 		alert(msg)
    	// 		return
    	// 	}
        APIManager.get('/api/profile', null, (err, response) => {
        	console.log(JSON.stringify(response))
        })
    	// 	console.log(JSON.stringify(response.body))
    	// })

    }

	render() {
		return (
			<div>
			    This is Profile container
			</div>

		)
	}
}

export default Profiles