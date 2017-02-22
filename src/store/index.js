import { combineReducers, applyMiddleware, createStore} from 'redux'    //NOT 'react-redux' 
import thunk from 'redux-thunk'       //NOT { thunks }
import { profileReducer} from '../reducers'

var store;     //NOT store(); 

export default {
	configureStore: () => {
		const reducers = combineReducers({
			profile: profileReducer
		})

		store = createStore(
			reducers,
            applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}

}
