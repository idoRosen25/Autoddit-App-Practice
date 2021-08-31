import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as routes from './routes'

const NavBar = ({loggedIn, username}) => (

  <div className='myNav'>
    <div className='navContainer'>
      <div className="navItem">
        <h3>Autoddit - {username}</h3>
      </div>
      {
        (loggedIn)?(
          <React.Fragment >
            <div className="navItemLink" >
              <Link to={routes.HOME}>Posts</Link>
            </div>
            <div className="navItemLink">
              <Link to={routes.ADD_POST}>Add Post</Link>
            </div>
          </React.Fragment>
        ) : ''
      }
    </div>
  </div>
);
const fromStateToProps = ({user}) => ({loggedIn: user.loggedIn, username:user.name});
export default connect(fromStateToProps)(NavBar);