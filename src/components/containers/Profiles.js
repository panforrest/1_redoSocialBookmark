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

    selectProfile(profile, event){
        event.preventDefault()   //NOT JUST preventDefault()
        //console.log('Select Profile: '+JSON.stringify(profile))   //NOT (this.state.proifle)
        this.props.profileSelected(profile)
    }

	render() { 
        const list = this.props.profiles.map((profile, i) => { 
            let name = null
            if (this.props.selected == null)
                name = <a onClick={this.selectProfile.bind(this, profile)}><span> {profile.firstName} </span> </a>  
            else if (this.props.selected.id == profile.id)     
                name = <a onClick={this.selectProfile.bind(this, profile)}><strong style={{color:'red'}}> {profile.firstName} </strong></a> 
            else
                name = <a onClick={this.selectProfile.bind(this, profile)}><span> {profile.firstName} </span></a> 

        	return (
        	    <li key={profile.id}> { name } </li>
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
        profiles: state.profile.list,
        selected: state.profile.selected
    }
}

const dispatchToProps = (dispatch) => {
    return {
        profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),
        profileSelected: (profile) => dispatch(actions.profileSelected(profile))
    }
}


export default connect(stateToProps, dispatchToProps)(Profiles)