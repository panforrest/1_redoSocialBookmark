import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { APIManager } from '../../utils'   //THIS NOT WORK: import utils from '../../utils'

class Bookmarks extends Component {
    constructor(){    //NOT construction(){ 
    	super()    //NOT preventDefault()
    	this.state = {
    		bookmarks: []    //NOt bookmarks: null
    	}
    }

    componentDidMount(){
    	// // console.log('conponentDidMount: ')
    	// //console.log('Bookmarks Container: '+JSON.stringify(this.state.Bookmarks))
    	// APIManager.get('/api/bookmark', null, (err, response) =>{
     //        if (err) {
     //        	alert(err)
     //        	return
     //        }
     //        // console.log('BOOKMARK LIST: '+JSON.stringify(response))
     //        // const bookmarks = response.results   //NOT var bookmarks = response.bookmarks
     //        // this.setState({
     //        //     bookmarks: bookmarks
     //        // })
     //        this.props.bookmarksReceived(response.results)   //NOT this.props.bookmarksReceived(bookmarks)
    	// })
    }

    componentDidUpdate(){
        console.log('componentDidUpdate: '+JSON.stringify(this.props.selected))
        APIManager.get('/api/bookmark', {profile: this.props.selected.id}, (err, response) => {
            if(err){
                return
            }
            this.props.bookmarksReceived(response.results)
        })
    }

	render() {
        const list = this.props.bookmarks.map(function(bookmark, i) {
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

const stateToProps = (state) => {
	return {
        selected: state.profile.selected,
		bookmarks: state.bookmark.all
	}
}

const dispatchToProps = (dispatch) => {
	return {
		bookmarksReceived: (bookmarks) => dispatch(actions.bookmarksReceived(bookmarks))
	}
}

export default connect(stateToProps, dispatchToProps)(Bookmarks)