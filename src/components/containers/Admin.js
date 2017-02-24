import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Signup } from './index.js'
import { APIManager } from '../../utils'     //NOT import utils from '../../utils'

class Admin extends Component {
    componentDidMount(){
    	APIManager.get('/account/currentuser', null, (err, response) => {   //REMEMBER , null, HERE
    		if (err){
    			alert(err)
    			return
    		}

    		console.log('CURRENT USER: '+JSON.stringify(response.profile))
            this.props.currentUserReceived(response.profile)   //NOT this.state.account.currentUser 
    	})
    }

	render() {
		return (
			<div>

                {(this.props.currentUser != null) ? <h2>Welcome, {this.props.currentUser.firstName}</h2>:
                    <Signup />    
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
		profileCreate: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)