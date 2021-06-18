import React, { Component } from 'react'
import {changeUserInfo } from "./UserFunctions";
 import "../styles/questions.css";
 import jwt_decode from 'jwt-decode';
class Settings extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        oldPassword: '',
        newPassword: '',
      };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const decoded = jwt_decode(localStorage.getItem("usertoken"))
    const data = {
      oldPWD: this.state.oldPassword,
      newPWD: this.state.newPassword,
      user_id: decoded.id,
    }

    changeUserInfo(data).then(res => {
      if (res) {
        this.props.history.push('/profile')
      }
    })
  }

  render() {
    return (
      <div  className="container">
        <h1>Settings</h1>
        <form className='form-group col-md-4 mx-auto' onSubmit={this.onSubmit}>
          <input type="password" className="form-control" placeholder="Enter old password" name="oldPassword" value={this.state.oldPassword} onChange={this.onChange}/><br/>
          <input type="password" className="form-control" placeholder="Enter new password" name="newPassword" value={this.state.newPassword} onChange={this.onChange}/><br/>
          <button type="submit" className="btn btn-outline-dark form-control">Submit</button>
        </form>
      </div>
    );
  }
}

export default Settings;