import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;
  
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
          {
            authUser ?
              <React.Fragment>
                <span>Welcome, {authUser.firstName}!</span>
                <Link className="signout" to="/signout">Sign Out</Link>
              </React.Fragment>
            :    
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
          }
        </nav>
      </div>
    </div>
  )
}

export default Header;