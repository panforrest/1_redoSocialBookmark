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
    	this.state = {
            visitor: {
            	url:''
            }
    	}
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

    updateLink(event){
    	// console.log('updateVisitor: ')
    	// var updated=Object.assign({}, this.state.visitor)
     //    var visitor[event.target.id] = event.target.value
        event.preventDefault()

        this.setState({         //NOT setState({
            link: event.target.value
        })
        console.log('updateLink: '+this.state.link)
    }

    submitLink(event){
    	event.preventDefault()
    	//console.log('submitLink: '+this.state.link)

    	const bookmark = {
    		profile: this.props.currentUser.id,     //NOT profile: this.props.profile 
    		url: this.state.link
    	}
        // console.log('submitLink: '+JSON.stringify(bookmark))
        console.log('currentuser.id: '+JSON.stringify(this.props.currentUser.id))

    	APIManager.post('/api/bookmark', bookmark, (err, response) => {    //NOT , this.state.link, 
    		if(err){
    			var msg = err.message || err
    			alert(err)
    			return
    		}

            console.log('bookmark created: '+JSON.stringify(response)) //NOT (response.bookmark)
    	})
    }

	render() {
		return (
			<div>

                {(this.props.currentUser == null) ? <Signup onRegister={this.register.bind(this)} onLogin={this.login.bind(this)}/> :
                    <div>
                        <h2>Welcome, {this.props.currentUser.firstName}</h2> 
                    
	                    
	                    <input onChange={this.updateLink.bind(this)} type="text" id="url" placeholder="URL" />
	                    <button onClick={this.submitLink.bind(this)}>Submit Link</button> <br />
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
		profileCreated: (profile) => dispatch(actions.profileCreated(profile)),
		currentUserReceived: (profile) => dispatch(actions.currentUserReceived(profile))
		
	}
}

export default connect(stateToProps, dispatchToProps)(Admin)