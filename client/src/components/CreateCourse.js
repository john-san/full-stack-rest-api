import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      errors: []
    }

    this.handleInputChange = this.handleInputChange.bind(this);
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
    } catch (err) {
      const arr = Object.values(err.response.data)[0];
      const mapped = arr.map(item => Object.values(item)[0]);
      this.setState({errors: mapped});
    }
  }

  handleError(err) {
    
  
//     express-validation errors: Array(2)
// 0: {title: "Please provide a value for "title""}
// 1: {description: "Please provide a value for "description""}
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>

        <div>

          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>

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
              <button className="button button-secondary"><a href="/">Cancel</a></button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;