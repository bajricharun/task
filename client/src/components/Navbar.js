import jwtDecode from 'jwt-decode';
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import "../styles/navbar.css";
class Landing extends Component {
  logOut(e) {
    e.preventDefault()
    localStorage.removeItem('usertoken')
    this.props.history.push(`/`)
  }
  constructor(props) {
    super(props) 
    this.state = {
      user_id: 0,
      hits: []
    }
  }
  componentDidMount() {
    const token = localStorage.getItem('usertoken');
    if(token) {
      const decoded = jwtDecode(localStorage.getItem('usertoken'));
      this.setState({user_id:decoded.id})
    }
  }
  

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={`/profile/${this.state.user_id}`} className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
        
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg rounded">
         <button
          className="navbar-toggler btn-outline-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
        <h4>askIT</h4>

      </nav>
    )
  }
}

export default withRouter(Landing)