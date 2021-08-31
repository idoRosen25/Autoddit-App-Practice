import { connect } from "react-redux";
import * as api from '../api';
import * as actions from '../actions';
import CommentModal from "./comment-modal";
import Votes from './votes';
import strTime from 'strftime';
import React from "react";

class AutodditCommentComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {modalOpen:false, modalFormValue:'',voteType:null};
        this.triggerModal = this.triggerModal.bind(this);
        this.onModalSubmit = this.onModalSubmit.bind(this);
        this.onModalChange = this.onModalChange.bind(this);
        this.voteHandler = this.voteHandler.bind(this);
    }

    onModalSubmit(){
        console.log(this.props.comment);
        console.log(this.props)
        let data = {
            user: this.props.username,
            comment: this.state.modalFormValue,
            date: new Date().getTime(),
            upVotes:0,
            postId: parseInt(this.props.comment.postId),
            parentId: this.props.id || null,
            comments: []
        };
        console.log(data);
        this.props.dispatch(api.setCommentReply(this.props.id,data))
            .then(()=>this.setState({modalOpen: !this.state.modalOpen, modalFormValue:''}));
    }

    voteHandler(id,vote,upvotes) {
        console.log("at start  "+this.state.voteType + "  "+vote)
        if(!this.state.voteType) {
            console.log("at if true  "+this.state.voteType + "  "+vote)
            this.state.voteType=vote;
            vote = (vote === 'up' || vote === actions.UPVOTE_COMMENT) ? actions.UPVOTE_COMMENT : actions.DOWNVOTE_COMMENT;
            this.props.dispatch(api.voteOnComment(id, vote, upvotes));
          }else{
            if(!(vote == this.state.voteType)){
                console.log("at else true  "+this.state.voteType + "  "+vote)
              this.state.voteType=null;
              vote = (vote === 'up' || vote === actions.UPVOTE_COMMENT) ? actions.UPVOTE_COMMENT : actions.DOWNVOTE_COMMENT;
              this.props.dispatch(api.voteOnComment(id, vote, upvotes));
              console.log("after else  "+this.state.voteType + "  "+vote)

            }
          }
    }

    onModalChange(event){
        this.setState({modalFormValue:event.target.value});
    }

    triggerModal(){
        this.setState({modalOpen: !this.state.modalOpen});
    }

    
    render(){
        return (
            <React.Fragment>
                <div className='commentSection'>
                <div className='commentContainer'>
                    <div className="commentVoter">
                        <Votes id={this.props.id} upvotes={this.props.comment.upVotes} voteHandler={this.voteHandler} />
                    </div>
                    <div style={{'width':'95%'}}>
                        <p className='commentUser'>{this.props.comment.user}</p>
                        <p className='commentDate'>{strTime('%b %e, %Y %R',new Date(this.props.comment.date))}</p>
                        <p className='commentText'>{this.props.comment.comment}</p>
                        <button className='replyBtn' onClick={this.triggerModal}>Reply</button>
                    </div>
                    <CommentModal modalOpen={this.state.modalOpen} triggerModal={this.triggerModal} onModalSubmit={this.onModalSubmit} onModalChange={this.onModalChange} modalFormValue={this.state.modalFormValue}/>
                </div>
                <div className='nestCommentContainer'>
                    {
                        (this.props.comment.comments) ? (
                            <div className='nestComment'>
                                {
                                    Object.entries(this.props.comment.children).map(
                                        ([id,comment])=>
                                            <AutodditComment key={id} id={id} comment={comment} postId={this.props.postId}/>
                                    )
                                }
                            </div>
                        ) : null
                    }
                </div>
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({username: state.user.name, ...ownProps});
const AutodditComment = connect(mapStateToProps)(AutodditCommentComponent);
export default AutodditComment;