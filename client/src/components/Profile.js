import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
const API='/users/profile'
var decoded = []
class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ID : props.match.params.id,
      first_name: '',
      last_name: '',
      email: '',
      user_id: '',
      errors: {},
      hits: [],
      posts: [],
      decoded: [],
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick() {

  }
  
  componentDidMount() {
    const token = localStorage.getItem("usertoken")
    if (token){
      decoded = jwt_decode(token);
    }
    const newID = JSON.stringify(decoded.id)
    this.setState({user_id:newID})

    fetch(`${API}/${this.state.ID}`)
    .then(response => response.json())
    .then(data => {
      this.setState({hits:data});
      this.setState({posts:data.questions})
      console.log(this.state.hits);
    })
  }

  render() {
    const div = (
      <div></div>
    )
    const userForm = (
      <button className="btn btn-outline-dark"><Link to="/settings">Settings</Link></button>
    )
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
          {this.state.ID === this.state.user_id ? userForm : div}

            <tbody>
              <tr>
                <td>Fist Name</td>
                <td>{this.state.hits.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{this.state.hits.last_name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.hits.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='col-md-8 mx-auto'>
          <h3>Questions by the user</h3>
        {
            this.state.posts.map(post =>
              <div className="post col-md-10 mt-5 mx-auto">
                    <h5>{post.questionTitle}</h5>
                    <p>Date posted: {post.createdAt}</p>
                      <Link to={`/post/${post.id}`} className="linked">
                        Read more...
                      </Link>
                    <br/>
                </div>
            
                )
            }
      </div>
          
        </div>
    )
  }
}

export default Profile