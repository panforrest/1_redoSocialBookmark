import React, { Component } from 'react'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions'

class Signup extends Component {

	constructor(){
        super()
        this.state = {
        	visitor: {
        		firstName: '',
        		lastName: '',
        		email: '',
        		password: '',
        	}
        }
	}

	componentDidMount(){
		// console.log('componentDidMount: ')
	}

    update(event){
    	// console.log('updatedEvent: ')
    	let updated = Object.assign({}, this.state.visitor)     //NOT var visitor = 
    	updated[event.target.id] = event.target.value     //NOT var updated['event.target.id']
    	this.setState({
            visitor: updated
    	})
    	// console.log(JSON.stringify(this.state.visitor))
    }

    register(event){
    	event.preventDefault()
    	console.log('REGISTER: '+JSON.stringify(this.state.visitor))
    	APIManager.post('/account/register', this.state.visitor, (err, response) => {    
    		if (err){
                let msg = err.message || err
                alert(msg)
                return
    		}


    		console.log('REGISTER: '+JSON.stringify(response))   //NOT JSON.stringify(response.result)
            this.props.profileCreated(response.profile)     //NOT this.props.profileCreated(response.result) 

    	})
    }

	render(){
		return(
			<div>
                <h2>Sign UP</h2>
			    <input onChange={this.update.bind(this)} type="text" id="firstName" placeholder="First Name" /><br />
			    <input onChange={this.update.bind(this)} type="text" id="lastName" placeholder="Last Name" /><br />
			    <input onChange={this.update.bind(this)} type="text" id="email" placeholder="Email" /><br />
			    <input onChange={this.update.bind(this)} type="text" id="password" placeholder="Password" /><br />
			    <br />
			    <button onClick={this.register.bind(this)}>Submit</button>
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
        profileCreated: (profile) => dispatch(actions.profileCreated(profile))
    }
}

export default connect(stateToProps, dispatchToProps)(Signup)