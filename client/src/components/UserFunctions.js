import axios from 'axios'
const API = '/users/changeInfo';
export const register = newUser => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('/users/login', {
      email: user.email,
      password: user.password,
      id: user.id
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}
export const posts = newPost => {
  return axios
    .post('questions/create', {
      questionTitle: newPost.questionTitle,
      questionText: newPost.questionText,
      user_id: newPost.user_id,
      })
    .catch(err => {
      console.log(err)
    })
}
export const edit = newData => {
  return axios.get('/questions/edit', {
    id: newData.id,
    questionText: newData.questionText,
    questionTitle: newData.questionTitle
  }).catch(err=>{console.log(err)})
}
export const comments = newComment => {
  return axios
    .post('/comments/addComment', {
      commentText: newComment.commentText,
      user_id: newComment.user_id,
      question_id:newComment.post_id,
      })
    .catch(err => {
      console.log(err)
    })
}

export const sendData = data => {
  return axios
  .get('/questions/:id', {
    id: data.id,
  })
  .catch(err => {
    console.log(err);
  })
}
export const sendProfileId = userId => {
  return axios 
  .post('/users/findID', {
    id: userId.user_id
  }).catch(err => {

    console.log("error from sendProfileId, UserFunctions.js" + err);
  })
}
export const sendID = userId => {
  return axios
  .post('/questions/showMine', {
    user_id: userId.user_id,
  }, 
 {
   headers:{"Content-Type": "application/json"}
 } 
  )
  .catch(err=> {
    console.log("error while sending ID " + err);
  })
}


export const like = data => {
  return axios
  .post('/likes/addLike', {
    question_id: data.post_id
  })
  .catch(err => {
    console.log(err);
  })
}

export const changeUserInfo = data => {
  return axios
  .post(API, {
    oldPWD: data.oldPWD,
    newPWD: data.newPWD,
    user_id: data.user_id
  })
}
