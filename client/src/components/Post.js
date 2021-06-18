import React, { Component } from 'react'
import { comments, like, edit } from './UserFunctions'
import jwt_decode from 'jwt-decode';
import {Link} from 'react-router-dom';
 import "../styles/questions.css";
 const API = '/questions';
 const APID = '/comments';
class Post extends Component {
  
  constructor(props) {
    super(props);
      this.state = {
        ID : props.match.params.id,
        user_id: localStorage.getItem("usertoken"),
        id: 0,
        commentText: '',
        hits:[],
        user:[],
        comments: [],
        comments_user: [],
        likes: 0,
        questionTitle: '',
        questionText: ''
    }
   this.edited = this.edited.bind(this)
    this.changeComment = this.changeComment.bind(this)
    this.commentFunction = this.commentFunction.bind(this)
    this.liked = this.liked.bind(this)
    this.onChange = this.onChange.bind(this)
  }
   liked() {
     const new_like = {
      post_id:this.state.ID
     }
     like(new_like)
   }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
   edited() {
     const edits = {
       id: this.state.ID,
       questionText: this.state.questionText,
       questionTitle: this.state.questionTitle
     }
     edit(edits);
   }
  commentFunction(e) {
    e.preventDefault()
    const new_comment = {
      commentText: this.state.commentText,
      post_id: this.state.ID,
      user_id: this.state.user_id
    }
    comments(new_comment)
  }

  changeComment(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

componentDidMount(){
  var decode = jwt_decode(this.state.user_id);
  this.setState({id: decode.id });

  
  let id = this.state.ID;
  fetch(`${API}/${id}`)
  .then(response => response.json())
  .then(data => {
    this.setState({hits:data});
    this.setState({user:data.user})
  }).catch(err => {
    console.log(err)
  })
  fetch(`${APID}/${id}`)
  .then(response => response.json())
  .then(data => {
    this.setState({comments:data})
    this.setState({comments_user: data.user})
  }).catch(err => {console.error(err)})

  fetch(`/likes/${id}`).then(response=>response.json()).then(data=>{this.setState({likes: data.length})})
}
  render() {
    const formForUser = (
      <div>
        <button style={{textAlign:'right'}} type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#exampleModal">
          Edit
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit question</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.edited} className='form-group'>
                  <input type="text" placeholder="Question title" name='questionTitle' className='form-control' value={this.state.questionTitle} onChange={this.onChange}/>
                  <textarea placeholder="Question text" name='questionText' className='form-control' value={this.state.questionText} onChange={this.onChange}></textarea>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    const commentsForUser = (
      <div className="comment col-md-8 mx-auto">
        <form className="commentForm" noValidate onSubmit={this.commentFunction}>
          <div className='row'>
            <div className='col-md-6 mx-auto'>
              <input type='text' className='form-control' placeholder="Comment..."  value={this.state.commentText} onChange={this.changeComment} name='commentText'/>
            </div>
            <div className="col-md-3 mx-auto">
              <button type='submit' className='btn btn-outline-light form-control'>Comment</button>
            </div>
          </div>
        </form>
      </div>
    )

    const div = (
      <div></div>
    )
    return (


        <div className="container-fluid">
        <h3>{this.state.hits.questionTitle}</h3>
        <div className='row'>
          {
                <div className="post col-md-8 mt-5 mx-auto">
                    <div className="smallLine col-md-12">
                      <div>
                        <Link to={`/profile/${this.state.user.id}`}>
                        <p>{this.state.user.first_name} {this.state.user.last_name}</p>
                        </Link>
                      </div>
                      <div>
                        <p style={{textAlign:'right'}}>{this.state.hits.createdAt}</p>
                      </div>
                    </div>
                    <h5>{this.state.hits.questionTitle}</h5>
                    <p className="textPost">{this.state.hits.questionText}</p>
                    <br/>
                    <div className="smallLineIcons col-md-12">
                      <div>
                        <button className="btn btnDarkWhite" onClick={this.liked}><i className="fa fa-thumbs-up icons"></i> {this.state.likes}</button>
                      </div>
                    </div>
                </div>
          }
          {this.state.user_id ? commentsForUser : div}
          {
            this.state.comments.map(comment => 
              <div className="comments col-md-8 mx-auto">
                <div className="smallLineNew col-md-12 mx-auto">
                  <p>Comment</p>
                  </div>
                <p>{comment.commentText}</p>
                
              </div>  
            )
          }
          
                            

        </div>
      </div>
    );
  }
}

export default Post;