import React from "react";
import * as api from '../api';
import * as routes from './routes';
import { connect } from 'react-redux';


class PostForm extends React.Component{
    constructor(props){
        super(props);
        this.errorBase = {titleError : false, linkError : false, imageError : false};
        this.state = {title: '', link : '', image : ''};
        this.onSubmit= this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(){
        if(this.state.title.length > 0 && this.state.image.length > 0 && this.state.link.length > 0){
            this.props.dispatch(
                api.setPosts({
                    title : this.state.title,
                    link : this.state.link,
                    image : this.state.image,
                    date : new Date().getTime(),
                    user : this.props.username,
                    upVotes : 0,
                    comments : []
                })
            ).then(()=>this.props.history.push(routes.HOME));
        }else{
            let errors = {...this.errorBase};
            if(this.state.title.length ===0){
                errors = {...errors, titleError:true};
            }
            if(this.state.image.length ===0){
                errors = {...errors, imageError:true};
            }
            if(this.state.link.length === 0){
                errors = {...errors, linkError:true};
            }
            this.setState({...errors});
        }
    }

    onChange(event,input){;
        this.setState({ [input]: event.target.value });
    }


    render(){
        return(
            <div className='postFormContainer'>
                 <form className='postForm'>
                     <label className='postFormLabel' >Title</label>
                     <input className='postFormInput' input='title' type='text' placeholder='Title' onChange={(e)=>this.onChange(e,'title')}/>
                     {
                        (this.state.titleError) ? (
                            <p className='formSubmitError'>Title Cannot Be Empty</p>
                        ) : ''
                    }
                    <label className='postFormLabel' >Link</label>
                    <input className='postFormInput' input='link' type='text' placeholder='Link' onChange={(e)=>this.onChange(e,'link')}/>
                    {
                        (this.state.linkError) ? (
                            <p className='formSubmitError'>Link Cannot Be Empty</p>
                        ) : ''
                    }
                    <label className='postFormLabel' >Image</label>
                    <input className='postFormInput'input='image' type='text' placeholder='Image' onChange={(e)=>this.onChange(e,'image')}/>
                    {
                        (this.state.imageError) ? (
                            <p className='formSubmitError'>Image Cannot Be Empty</p>
                        ) : ''
                    }
                    <button className='postFormBtn' type='submit' onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps= (state,ownProps)=>({username:state.user.name, ...ownProps});
export default connect(mapStateToProps)(PostForm);