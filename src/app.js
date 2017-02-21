import React, { Component } from 'react'  //...from ('react') IS WRONG
import ReactDOM from 'react-dom'
import { Home } from './components/layout'

class App extends Component {
	render() {
		return (
			<div>
               This is React App.
               <Home />
            </div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))