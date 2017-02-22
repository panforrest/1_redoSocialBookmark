import React, { Component } from 'react'  //...from ('react') IS WRONG
import ReactDOM from 'react-dom'
import { Home } from './components/layout'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
	render() {
		return (
			<Provider store={store.configureStore()}> 
				<div className="container">
	               
	               <Home />
	            </div>
	        </Provider>    
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))