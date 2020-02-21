import React, { Component } from 'react';
import FormErrors from './FormErrors';
import axios from 'axios';
import config from '../../config';

class CourseForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: this.props.course.title || "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    console.log(this.props);
  }

    // https://reactjs.org/docs/forms.html
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value
      });
    }

   handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = { userId: 1, ...this.state };

      const response = await axios({
        method: 'post',
        url: config.apiBaseUrl + "/courses",
        data: body,
        auth: {
          username: 'joe@smith.com',
          password: 'joepassword'
        }
      });
      console.log("Success! ", response);
      this.props.history.push("/");
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err) {
    const errors = Object.values(err.response.data)[0]
      .map(item => Object.values(item)[0]);
    this.setState({ errors });
  }


  render() {
    return (
      <div>

        {
          this.state.errors.length > 0 ?
            <FormErrors errors={this.state.errors} />
          :
            false
        }

        <form onSubmit={this.handleSubmit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input 
                  id="title" 
                  name="title" 
                  type="text" 
                  className="input-title course--title--input" 
                  placeholder="Course title..." 
                  value={this.state.title} 
                  onChange={this.handleInputChange}
                />
              </div>
              <p>By Joe Smith</p>
            </div>
    
            <div className="course--description">
              <div>
                <textarea 
                  id="description" 
                  name="description" 
                  className="" 
                  placeholder="Course description..."
                  value={this.state.description}
                  onChange={this.handleInputChange}  
                >
                </textarea>
              </div>
            </div>
          </div>
    
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text" 
                      className="course--time--input" 
                      placeholder="Hours" 
                      value={this.state.estimatedTime}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded" 
                      className="" 
                      placeholder="List materials..."
                      onChange={this.handleInputChange} 
                    >
                    </textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
    
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Create Course</button>
            <a className="button button-secondary" href="/">Cancel</a>
          </div>
    
        </form>

      </div>
    );
  }
  
  
        
    
}

export default CourseForm;