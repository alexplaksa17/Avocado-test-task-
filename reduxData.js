export const types = {
  LOAD_POSTS: 'LOAD_POSTS',
  LOAD_POSTS_REQ: 'LOAD_POSTS_REQ',
  LOAD_POSTS_RES: 'LOAD_POSTS_RES',
  CLEAR_POSTS: 'CLEAR_POSTS',
  ADD_POST_IMAGE: 'ADD_POST_IMAGE',
  ADD_POST_TEXT: 'ADD_POST_TEXT',
  UPLOAD_POST: 'LOAD_POST',
  UPLOAD_POST_REQ: 'UPLOAD_POST_REQ',
  UPLOAD_POST_RES: 'UPLOAD_POST_RES',
  CHANGE_ICON:'CHANGE_ICON',
  CHANGE_NAME:'CHANGE_NAME',
  USE_PICKER_TO_NEW_USERICON:'USE_PICKER_TO_NEW_USERICON',
  USE_PICKER_TO_NEW_PHOTO:'USE_PICKER_TO_NEW_PHOTO',
}

export const actionCreators = {
  loadPosts: () => async (dispatch, getState) => {
    dispatch({type: types.LOAD_POSTS_REQ})

    try {
      /* request to get data about posts */
      const response = await fetch('https://raw.githubusercontent.com/alexplaksa17/InstaData/master/homefeed.js')
      const posts = await response.json()
      dispatch({type: types.LOAD_POSTS_RES, payload: posts.data})
    }

    catch (e) {
      dispatch({type: types.LOAD_POSTS_RES, payload: e, error: true})
    }

  },
  clearPosts: () => async (dispatch, getState) => {
    if (getState().feedPosts.posts.length > 0) {
      dispatch({type: types.CLEAR_POSTS})
    }
  },
  uploadPost: () => async (dispatch,getState) => {
    dispatch({type: types.UPLOAD_POST_REQ})

    /*here might be POST request to server with JSON data about created post
      imagine, it returns 201 status and JSON data about added post
      so we can add it to our feed of posts
    */
    let id=getState().feedPosts.posts[0].id+1;
    let userIcon=getState().userInfo.userIcon;
    let user=getState().userInfo.userName;
    let photoUrl=getState().addPost.image;
    let text=getState().addPost.text;

    let data = {id,user,userIcon,photoUrl,text};






    setTimeout( ()=>{
      dispatch({type: types.UPLOAD_POST_RES, payload: data })
     },2000)
    }

}

const initialState = {
  feedPosts:{
    loading: true,
    error: false,
    posts:[],
  },
  userInfo:{
    userIcon: 'https://i1.sndcdn.com/artworks-000197067830-ykgf25-t500x500.jpg',
    userName: 'defaultUser',
  },
  addPost:{
    image:'',
    text:''
  },
  pickerStatus:'newPhoto',
}


export const reducer = (state = initialState, action) => {
  const {posts} = state
  const {type, payload, error} = action

  switch (type) {
    case types.LOAD_POSTS_REQ: {
      return {...state, feedPosts:{...state.feedPosts, loading: true, error: false} }
    }
    case types.LOAD_POSTS_RES: {
      if (error) {
        return {...state, feedPosts:{loading: false, error: true } }
      }
      return {...state, feedPosts:{ loading: false, error: false, posts:payload } }
    }

    case types.CLEAR_POSTS: {
      return {...state, feedPosts:{ ...state.feedPosts, posts: [] } }
    }

    case types.ADD_POST_IMAGE:{
      return {...state, addPost: {...state.addPost, image: payload} }
    }

    case types.ADD_POST_TEXT:{
      return {...state, addPost:{...state.addPost,  text:payload } }
    }

    case types.UPLOAD_POST_REQ:{
      return {...state, feedPosts:{...state.feedPosts, loading: true, error: false} }
    }

    case types.UPLOAD_POST_RES:{


      return {
        ...state,
         feedPosts:{
           loading: false,
           error: false,
           posts:[payload, ...state.feedPosts.posts]
        },
        addPost:{
          ...state.addPost,
          image:'',
          text:''
        }
      }
    }

    case types.USE_PICKER_TO_NEW_USERICON:{
      return {...state, pickerStatus:'newUserIcon' }
    }

    case types.USE_PICKER_TO_NEW_PHOTO:{
      return {...state, pickerStatus:'newPhoto' }
    }

    case types.CHANGE_ICON:{
      return {...state, userInfo: {...state.userInfo, userIcon: payload} }
    }

    case types.CHANGE_NAME:{
      return {...state, userInfo: {...state.userInfo, userName: payload} }
    }

    default : return state;
  }

}
