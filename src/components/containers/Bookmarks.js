import React, { Component } from 'react'
//import { connect } from 'react-redux'
import { APIManager } from '../../utils'

class Bookmarks extends Component {
    componentDidMount(){
    	// console.log('conponentDidMount: ')
    	//console.log('Bookmarks Container: '+JSON.stringify(this.state.Bookmarks))
    	APIManager.get('/api/bookmark', null, (err, response) =>{
            if (err) {
            	alert(err)
            	return
            }
            console.log('BOOKMARK LIST: '+JSON.stringify(response))
    	})
    }

	render() {
		return (
			<div>
			    This is Bookmarks Containter
			</div>
		)
	}
}

export default Bookmarks