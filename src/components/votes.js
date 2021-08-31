import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


class Vote extends React.Component{
    constructor(props){
        super(props);
        this.vote = this.vote.bind(this);
    }

    vote(vote){
        this.props.voteHandler(this.props.id,vote,this.props.upvotes);
    }

    render(){
        return (
            <div className='voteContainer'>
                <FontAwesomeIcon icon={faArrowUp} className='voteArrow' onClick={ ()=> this.vote('up')}/>
                <span className='voteCounter'>{this.props.upvotes}</span>
                <FontAwesomeIcon icon={faArrowDown} className='voteArrow' onClick={ ()=> this.vote('down')}/>
            </div>
        );
    }
}

export default Vote;