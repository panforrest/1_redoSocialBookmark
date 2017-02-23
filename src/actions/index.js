import constants from '../constants'

export default {

    profilesReceived: (profiles) => {    //NOT profilesReceived: (profiles, type) => {
    	return {
    		type: constants.PROFILES_RECEIVED,
    		profiles: profiles
    	}
    },

    profileCreated: (profile) => {
    	return {
    		type: constants.PROFILE_CREATED,
    		profile: profile
    	}
    }

}