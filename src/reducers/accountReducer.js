import constants from '../constants'

var initialState = {
	currentUser: null     //NOT currentUser: {}  
}

export default (state=initialState, action) => {   //NOT export default (state=initialState, action){
    let updated = Object.assign({}, state)   //NOT let updated = Object.assign({}, action.profile)	
    switch(action.type){           //NOT switch(action, type){

    	case constants.PROFILE_CREATED:      //NOT case constants.CURRENT_USER_RECEIVED:
            updated['currentUser'] = action.profile
    	    return updated

    	default:
    	    return state
    }

}