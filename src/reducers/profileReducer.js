import constants from '../constants'

var initialState = {
	list: [],       //SHOULD NOT BE profiles: []
    selectd: null
}

export default(state=initialState, action) => {        //NOT module.exports = {
     let updated = Object.assign({}, state)
    switch(action.type){               //NOT switch(state=initialState, action) => {
        case constants.PROFILES_RECEIVED:
            console.log('PROFILES_RECEIVED: '+JSON.stringify(action.profiles))
            updated['list'] = action.profiles
            if (action.profiles.length>0)
                updated['selected'] = action.profiles[0]

            return updated //NOT status

        case constants.PROFILE_CREATED:
            let updatedList = Object.assign([], updated.list)   //NOT let updatedList = Object.assign({}, updated)   
            updatedList.push(action.profile)
            updated['list'] = updatedList
            return updated

        default:
            return state   //NOTstatus

    }



}