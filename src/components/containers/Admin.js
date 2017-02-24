import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'

class Admin extends Component {
	render() {
		return (
			<div>
			    This is Admin Container.

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

const dispatchToprops = (dispatch) => {
	return {
		profileCreate: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUerReceived(profile))
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)