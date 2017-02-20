import React, { Component } from 'react'  //...from ('react') IS WRONG
import ReactDOM from 'react-dom'

class App extends Component {
	render() {
		return (
			<div>
               This is React App.
            </div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'))