import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {posts, comments } from "./UserFunctions";
 import "../styles/questions.css";
const API = "/questions/showAll"
class Landing extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        questionTitle: '',
        questionText: '',
        user_id: localStorage.getItem("usertoken"),
        commentText: '',
        errors: {},
        hits:[],
    };

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.changeComment = this.changeComment.bind(this)
    this.commentFunction = this.commentFunction.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  changeComment(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const new_question = {
      questionTitle: this.state.questionTitle,
      questionText: this.state.questionText,
      user_id: this.state.user_id,
    }

    posts(new_question).then(res => {
      if (res) {
        this.props.history.push('/')
      }
    })
  }

  commentFunction(e) {
    e.preventDefault()
    const new_comment = {
      commentText: this.state.commentText,
      user_id: this.state.user_id
    }
    comments(new_comment).then(res => {
      if(res)
        this.props.history.push('/')
    })
  }

componentDidMount(){
  fetch(API)
  .then(response => response.json())
  .then(data => {this.setState({hits:data}); console.log(data)})
}
  render() {
    const userInput = (
      <form noValidate onSubmit={this.onSubmit}>
            <h3>Post a new question</h3>
              <div className="form-group">
                <label htmlFor="questionTitle">Question Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="questionTitle"
                  placeholder="Enter title"
                  value={this.state.questionTitle}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="questionText">Question Text</label>
                <textarea
                  className="form-control"
                  name="questionText"
                  placeholder="Text"
                  value={this.state.questionText}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-md btn-primary btn-block"
              >
                Post the question
              </button>
            </form>
          
    )


    const loginNew = (
      <p>If you <Link to="/register">register</Link> to our page you could contribute with answers and questions. </p>
    )
    const div = (
      <div></div>
    )
    return (

        <div className="container">
          <br/>
            <div className="row">
          <div className="col-md-8 mt-5 mx-auto">
          {localStorage.usertoken ? userInput : loginNew}
            
        <h3>Latest Questions</h3>
        <div className='row'>
          {
            this.state.hits.map(hit =>
                <div className="post col-md-10 mt-5 mx-auto">
                    <h5>{hit.questionTitle}</h5>
                    <p>Date posted: {hit.createdAt}</p>
                      <Link to={`/post/${hit.id}`} className="linked">
                        Read more...
                      </Link>
                    <br/>
                </div>
              )
          }
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Landing;