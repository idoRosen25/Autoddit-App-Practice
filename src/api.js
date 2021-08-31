let posts = require('./data/posts.json');
let comments = require('./data/comments.json');

import * as actions from './actions';

export const getJSONPosts = ()=> new Promise((resolve)=>resolve(posts));
export const getJSONComments= () => new Promise ((resolve)=>resolve(comments));
export const setUsername = (username) => new Promise((resolve) => resolve(username));

export const getCommentsByPostAPI = (postId) => {
    let returnComment = {};
    console.log(comments)
    for(let id in comments){
        if(comments[id]['postId'] === parseInt(postId)){
            returnComment[id]=comments[id];
        }
    }
    return new Promise((resolve)=>resolve(returnComment));
}

export const getCommentsAPI = (commentIds) => {
    let returnComment = {};
    commentIds.forEach( (id) =>returnComment[id] = comments[id] );
    return new Promise((resolve)=>resolve(returnComment));
}

export const getPosts = ()=>{
    return (dispatch) => getJSONPosts().then((data)=>dispatch(actions.addPost(data)));
};

export const setPosts = (post)=>{
    return (dispatch)=>putPost(post).then((data)=>dispatch(actions.addPost(data)));
};

export const getComments = (commentIds) =>{
    return (dispatch) => getCommentsApi(commentIds).then((date)=>dispatch(actions.addComment(date)));
}

export const getCommentsByPost = (postId) =>{
    return (dispatch) => getCommentsByPostAPI(postId).then((data)=> dispatch(actions.addComment(data)));
}

export const login = (username)=>(dispatch)=>{
    return setUsername(username).then((date)=>dispatch(actions.updateUser(date)));
};

export const setCommentPost = (postId, comment) => {
    return (dispatch) => putComment(postId, comment).then((data) => dispatch(actions.addComment(data)))
  };
  
  export const setCommentReply = (commentId, comment) => {
    return (dispatch) => putReply(commentId, comment).then((data) => dispatch(actions.addComment(data)))
  }

export const putPost = (post) => {
    let nextId = Math.max(...Object.keys(posts)) + 1;
    posts = {...posts, [nextId]: post};
    return new Promise((resolve) => resolve({[nextId]: post}));
  };
  
  export const putComment = (postId, comment) => {
    let nextId = Math.max(...Object.keys(comments)) + 1;
    comments = {...comments, [nextId]: comment};
    posts[postId].comments.push(nextId);
    return new Promise((resolve) => resolve({[nextId]: comment}));
  };
  
  export const putReply = (commentId, comment) => {
    let nextId = Math.max(...Object.keys(comments)) + 1;
    comments = {...comments, [nextId]: comment};
    comments[commentId].comments.push(nextId);
    return new Promise((resolve) => resolve({[nextId]: comment}));
  };
  
  export const voteOnPost = (id, type, upvotes) => (dispatch) => {
    dispatch((type === actions.UPVOTE_POST) ? actions.upVotePost(id, upvotes) : actions.downVotePost(id, upvotes));
  };
  
  export const voteOnComment = (id, type, upvotes) => (dispatch) => {
    dispatch((type === actions.UPVOTE_COMMENT) ? actions.upVoteComment(id, upvotes) : actions.downVoteComment(id, upvotes));
  }
