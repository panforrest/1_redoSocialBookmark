import constants from '../constants'

var initialState = {
	list: []       //SHOULD NOT BE profiles: []
}

export default(state=initialState, action) => {        //NOT module.exports = {
     let updated = Object.assign({}, state)
    switch(action.type){               //NOT switch(state=initialState, action) => {
        case constants.PROFILES_RECEIVED:
            console.log('PROFILES_RECEIVED: '+JSON.stringify(action.profiles))
            updated['list'] = action.profiles

            return updated //NOT status
        
        default:
            return state   //NOTstatus

    }



}