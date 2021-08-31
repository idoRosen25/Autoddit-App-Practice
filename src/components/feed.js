import { Component } from "react";
import { connect } from "react-redux";
import Votes from './votes';
import * as api from '../api';
import * as actions from '../actions';
import Post from './post';

class FeedMain extends Component {
    constructor(props){
        super(props);
        this.state = {voteType:null};
        this.props.dispatch(api.getPosts());
    }

    voteHandler = (id,vote,upvotes)=>{
      if(!this.state.voteType) {
        this.state.voteType=vote;
        vote = (vote === 'up' || vote === actions.UPVOTE_POST) ? actions.UPVOTE_POST : actions.DOWNVOTE_POST;
        this.props.dispatch(api.voteOnPost(id, vote, upvotes));
      }else{
        if(!(vote == this.state.voteType)){
          this.state.voteType=null;
          vote = (vote === 'up' || vote === actions.UPVOTE_POST) ? actions.UPVOTE_POST : actions.DOWNVOTE_POST;
          this.props.dispatch(api.voteOnPost(id, vote, upvotes));
        }
      }

    }

    render() {
        const posts = Object.keys(this.props.posts).map((key) => ({post: this.props.posts[key], id: key}));

        return (
          <div className="feedContainer">
            {
              posts.map(({post,id}) => (
                <div className='postOnFeed' key={id}>
                  <Votes id={id} upvotes={post.upVotes} voteHandler={this.voteHandler}/>
                  <img className='postImg' src={post.image} />
                  <Post post={post} id={id} />
                </div>
              ))
            }

          </div>
        );
      }
}
const mapStateToProps = (state, ownProps)=> ({posts:state.posts, user:state.user, ownProps});
export default connect(mapStateToProps)(FeedMain);
