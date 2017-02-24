import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {
	render() {
		return (
			<div>

                {(this.props.currentUser != null) ? <h2>Welcome, {this.props.currentUser.firstName}</h2>:
                    <div>
                        User is not logged in!
                    </div>
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
		currentUserReceived: (profile) => dispatch(actions.currentUerReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)