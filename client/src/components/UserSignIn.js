import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './subcomponents/UserForm';

class UserSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      errors: []
    }
  }
  

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = async () => {
    try {
      const { context } = this.props;
      const { from } = this.props.location.state || { from: { pathname: '/' } };
      const { emailAddress, password } = this.state;
      const user = await context.actions.signIn(emailAddress, password);
      if (user === null) {
        this.setState({ errors: [ 'Sign-in was unsuccessful' ] });
      } else {
        this.props.history.push(from);
        console.log(`SUCCESS! ${emailAddress} is now signed in!`);
      }
    } catch(err) {
      console.dir(err);
      this.props.history.push('/error');
    }
  }

  cancel = () => {
    this.props.history.push('/');
  }


  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <UserForm 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text" 
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address" 
                />
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={password}
                  onChange={this.change}
                  placeholder="Password" 
                />
              </React.Fragment>
            )}
          />

          <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
        </div>
      </div>
   );
  }  
  
}

export default UserSignIn;