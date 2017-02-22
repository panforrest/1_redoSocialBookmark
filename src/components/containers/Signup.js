import React, { Component } from 'react'

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
		console.log('componentDidMount: ')
	}

    update(event){
    	// console.log('updatedEvent: ')
    	let updated = Object.assign({}, this.state.visitor)     //var visitor = 
    	updated[event.target.id] = event.target.value     //var updated['event.target.id']
    	this.setState({
            visitor: updated
    	})
    	console.log(JSON.stringify(this.state.visitor))
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
			    <button>Submit</button>
			</div>

		)
	}
}

export default Signup