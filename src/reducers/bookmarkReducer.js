import constants from '../constants'

var initialState = {
	all: []   //NOT bookmarks: []
}

export default(state=initialState, action) =>{
	let updated=Object.assign({}, state)    //THIS LINE NEED TO BE BEFORE THE switch(action.type){}
	switch(action.type){
		
		case constants.BOOKMARKS_RECEIVED:
		    // updated['list'] = action.bookmarks
		    console.log('BOOKMARKS_RECEIVED: '+JSON.stringify(action.bookmarks))
		    updated['all'] = action.bookmarks    //NEWLY ADDED
		    return updated

		default:      //NOT case default:
		    return state
	}
}