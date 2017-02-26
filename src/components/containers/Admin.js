import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Signup } from '../Presentation'
import { APIManager } from '../../utils'     //NOT import utils from '../../utils'

class Admin extends Component {

    constructor(){
    	// this.state = {
    	// 	visitor: {
    	// 		lastName:'',
    	// 		firstName:'',
    	// 		email:
    	// 	}
    	// }
    	super()
    	this.state
    }

    componentDidMount(){
    	APIManager.get('/account/currentuser', null, (err, response) => {   //REMEMBER , null, HERE
    		if (err){
    			alert(err)
    			return
    		}

    		if (response.profile == null) {
                return
    		}

    		//if user is logged in
    		console.log('CURRENT USER: '+JSON.stringify(response.profile))
            this.props.currentUserReceived(response.profile)   //NOT this.state.account.currentUser 
    	})
    }

    register(visitor){    //NOT register(event){
    	// event.preventDefault()  //WHY TO COMMENT OUT HERE
    	//console.log('REGISTER: '+JSON.stringify(this.state.visitor))
    	APIManager.post('/account/register', visitor, (err, response) => {  //NOT , this.state.visitor,   
    		if (err){
                let msg = err.message || err
                alert(msg)
                return
    		}


    		console.log('REGISTER: '+JSON.stringify(response))   //NOT JSON.stringify(response.result)
            this.props.profileCreated(response.profile)     //NOT this.props.profileCreated(response.result) 

    	})
    }

// WHY DON'T NEED update(event){} METHOD?
	   // update(event){
	   //  	// console.log('updatedEvent: ')
	   //  	let updated = Object.assign({}, this.state.visitor)     //NOT var visitor = 
	   //  	updated[event.target.id] = event.target.value     //NOT var updated['event.target.id']
	   //  	this.setState({
	   //          visitor: updated
	   //  	})
	   //  	 console.log(JSON.stringify(this.state.visitor))
	   //  }

    login(credentials){   //WHY NOT login(event){
        // event.preventDefault()   //WHY COMMENT OUT HERE?
        // console.log('LOGIN: '+JSON.stringify(this.state.visitor))
        APIManager.post('/account/login', credentials, (err, response) => {  //WHY NOT this.state.visitor
            if (err){
                let msg = err.message || err
                alert(msg)
                return
            }
            console.log('LOGIN: '+JSON.stringify(response))   //NOT(this.state.visitor)
            this.props.currentUserReceived(response.profile)    //NOT this.props.currentuserReceived(profile) 
        })

    }

	render() {
		return (
			<div>

                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> :
                    
                    <h2>Welcome, {this.props.currentUser.firstName}</h2>   
                }
 
			</div>

		)
	}
}

const stateToProps = (state) => {
	return {
		profile: state.profile.list,
		currentUser: state.account.currentUser
	}
}

const dispatchToProps = (dispatch) => {
	return {
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)