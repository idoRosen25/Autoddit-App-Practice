import { Component } from 'react';
import {connect} from 'react-redux';
import * as api from '../api';
import { HOME } from './routes';

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {name:'', error: false};
        this.onSubmit= this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        if(this.state.name){
            api.setUsername(this.state.name)
                .then((username) => this.props.dispatch(api.login(username)))
                .then(() => this.props.history.push(HOME));
        }else{
            this.setState({error:true});
        }
    }

    onChange(event){
        this.setState({name:event.target.value})
    }

    render(){
        return (
            <div className="loginContainer">
                <form className='loginForm'>
                    <label className='loginLabel' >UserName</label>
                    <input className='loginInput' type='text' placeholder='Username' onChange={this.onChange}/>
                        <button className='loginActionBtn' type='submit' onClick={this.onSubmit}>Submit</button>
                        {
                            (this.state.error) ? (
                                <p className='formSubmitError'>Username Cannot Be Empty</p>
                            ) : ''
                        }
                </form>
            </div>
        );
    }
}
export default connect()(LoginForm);