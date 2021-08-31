import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComment} from '@fortawesome/free-solid-svg-icons';
import * as api from '../api';
import AutodditComment from './comment';
import CommentModal from './comment-modal';
const strTime = require('strftime');

const ShowComments = ({showComments, comments, postId}) => {
  console.log("openede comments");
    return (showComments) ? (
      <div style={{'marginTop':'6%', 'marginLeft':'-70%','width':'150%'}}>
      {
        Object.entries(comments).map(
          ([id, comment]) => <AutodditComment key={id} id={id} postId={postId} comment={comment}/>
        )
      }
      </div>
    ) : '';
};

const getNestedComments = (id, comments, commentsNestedObject) => {
    let comment = comments[id];
  
    commentsNestedObject[id] = {...comment};
    commentsNestedObject[id].children = {};
    comment.comments.forEach((commentId) => {
      getNestedComments(commentId, comments, commentsNestedObject[id].children);
    });
  
    return commentsNestedObject;
}

class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {modalOpen:false, showComments:false,modalFormValue:""};
        this.triggerModal = this.triggerModal.bind(this);
        this.onModalChange = this.onModalChange.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);

        this.props.dispatch(api.getCommentsByPost(this.props.id));
    }

    onModalSubmit(){
        let data = {
            user: this.props.username,
            comment: this.state.modalFormValue,
            date: new Date().getTime(),
            upVotes: 0,
            postId: parseInt(this.props.id),
            parentId: null,
            comments: []
          };
      
          this.props.dispatch(api.setCommentPost(this.props.id, data))
            .then(() => this.props.dispatch(api.getPosts()))
            .then(() => this.setState({modalOpen: !this.state.modalOpen, modalFormValue: ''}));
    }

    onModalChange(event){
        this.setState({modalFormValue:event.target.value});
    }

    triggerModal(){
        this.setState({modalOpen: !this.state.modalOpen});
    }


    getCommentsFromProps(nextPropsComments) {
        let comments = {}
        for (let id in nextPropsComments) {
          if (nextPropsComments[id]['postId'] === parseInt(this.props.id)) {
            comments[id] = nextPropsComments[id]
          }
        }
        return comments;
    }
    
    componentWillReceiveProps(nextProps) {
        let comments = this.getCommentsFromProps(nextProps.comments);
        let commentsNestedObject = {};
    
        Object.entries(comments)
          .filter(([key, value]) => value.parentId === null)
          .forEach(([key, value]) => getNestedComments(key, comments, commentsNestedObject));
    
        this.setState({commentsCount: Object.keys(comments).length, nestedComments: commentsNestedObject});
    }
      
    render(){
        return (
        <React.Fragment>
          <div style={{'width':'50%',}}>
            <div>
              <h4 className='postTitle'><a  href={this.props.post.link} target='_blank'>{this.props.post.title}</a></h4>
              <p className='postSubmit' >
               Submitted on {strTime('%b %e, %Y %R',new Date(this.props.post.date))} by {this.props.post.title}
              </p>
            </div>
            <div className='postComments'>
              <div style={{'display':'flex'}}>
                <FontAwesomeIcon icon={faComment} onClick={ () => this.setState( () => ({showComments:!this.state.showComments,modalOpen:false}))}/>
                <p onClick={ () => this.setState( () => ({showComments:!this.state.showComments,modalOpen:false}))} style={{'margin':'0 3% 0 1%'}}>{this.state.commentsCount} comments</p>
                <button onClick={this.triggerModal}>Add Comment</button>
              </div>
              {
                (this.state.modalOpen) ? (
                  <CommentModal modalOpen={this.state.modalOpen} triggerModal={this.triggerModal} onModalSubmit={this.onModalSubmit} onModalChange={this.onModalChange} modalFormValue={this.state.modalFormValue}/>
                ) : null
              }
            </div>
            <ShowComments className='commentContent' showComments={this.state.showComments} comments={this.state.nestedComments} postId={this.props.post.id} />
          </div>
        </React.Fragment>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({username:state.user.name, comments: state.comments, ...ownProps});
export default connect(mapStateToProps)(Post);