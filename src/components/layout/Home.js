import React, { Component } from 'react'
import { Profiles, Admin, Bookmarks } from '../containers'


class Home extends Component {
	render() {
		return (
            <div className="row">                               
                <div className="col-md-3">
                    Left
                    <Profiles />
                </div>
                          
                <div className="col-md-6">
                    Middle
                    <Bookmarks />
                </div>                
            
                <div className="col-md-3">
                    
                    
                    <Admin />
                </div>                
            </div>
		)
	}
}

export default Home