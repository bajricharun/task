import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
import Post from './components/Post'
import Settings from './components/Settings'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/post/:id"  component={Post}/>

          </div>
        </div>
      </Router>
    )
  }
}

export default App