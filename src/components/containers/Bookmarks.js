import React, { Component } from 'react'
// import { connect } from 'react-redux'

import { APIManager } from '../../utils'   //THIS NOT WORK: import utils from '../../utils'

class Bookmarks extends Component {
    constructor(){    //NOT construction(){ 
    	super()    //NOT preventDefault()
    	this.state = {
    		bookmarks: []    //NOt bookmarks: null
    	}
    }

    componentDidMount(){
    	// console.log('conponentDidMount: ')
    	//console.log('Bookmarks Container: '+JSON.stringify(this.state.Bookmarks))
    	APIManager.get('/api/bookmark', null, (err, response) =>{
            if (err) {
            	alert(err)
            	return
            }
            console.log('BOOKMARK LIST: '+JSON.stringify(response))
            const bookmarks = response.results   //NOT var bookmarks = response.bookmarks
            this.setState({
                bookmarks: bookmarks
            })
    	})
    }

	render() {
        const list = this.state.bookmarks.map(function(bookmark, i) {
        	return (
        	    <li key={bookmark.id}>{bookmark.description}</li> 
        	)   
        })

		return (
			<div>
			    This is Bookmarks Containter
			    <ol>
			        {list}
			    </ol>
			</div>
		)
	}
}

export default Bookmarks