import React, { Component } from 'react'
// import superagent from 'superagent'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'

class Profiles extends Component {

	constructor(){
		super()
		this.state = {
			profiles: []
		}
	}

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
        	// console.log(JSON.stringify(response))
        	const results = response.results
        	// this.setState({
         //        profiles: results
        	// })
            this.props.profilesReceived(results)  //NOT this.actions.profilesReceived(results)
        })
    	// 	console.log(JSON.stringify(response.body))
    	// })

    }

	render() {
        const list = this.state.profiles.map((profile, i) => {     
        	return (
        	    <li key={profile.id}> { profile.firstName } </li>
        	)
        }) 

		return (
			<div>
			    <ol>
			        {list}
			    </ol>
			</div>

		)
	}
}

const stateToProps = (state) => {
    return {
        profiles: state.profile.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles))
    }
}


export default connect(stateToProps, dispatchToProps)(Profiles)