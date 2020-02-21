import React, { Component } from 'react';
import FormErrors from './FormErrors';
import CourseFormActions from './CourseFormActions';
import axios from 'axios';
import config from '../../config';

class CourseForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errors: [],
      location: this.props.match.url.split("/").pop()
    }

    const inputs = ['title', 'description', 'estimatedTime', 'materialsNeeded'];
    inputs.forEach(input => this[input] = React.createRef());
  }

   handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let url = `${config.apiBaseUrl}/courses`;
      let method = 'post';
      const body = { 
        userId: 1, 
        title: this.title.current.value,
        description: this.description.current.value,
        estimatedTime: this.estimatedTime.current.value,
        materialsNeeded: this.materialsNeeded.current.value
      };

      
      if (this.state.location === "update") { 
        url += `/${this.props.match.params.id}`;
        method = 'put';
      }
      const response = await axios({
        method,
        url,
        data: body,
        auth: {
          username: 'joe@smith.com',
          password: 'joepassword'
        }
      });

      console.log("Success! ", response);
      if (this.state.location === "update") {
        this.props.history.push(`/courses/${this.props.match.params.id}/view`);
      } else {
        this.props.history.push("/");
      }
      
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
        <FormErrors errors={this.state.errors} />
        
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
                  ref={this.title}
                  defaultValue={this.props.course ? this.props.course.title : ""}
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
                  ref={this.description}
                  defaultValue={this.props.course ? this.props.course.description : ""}
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
                      ref={this.estimatedTime}
                      defaultValue={this.props.course ? this.props.course.estimatedTime : ""}
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
                      ref={this.materialsNeeded}
                      defaultValue={this.props.course ? this.props.course.materialsNeeded : ""}
                    >
                    </textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
    
          <CourseFormActions
            location={this.state.location}
            match={this.props.match}
          />
    
        </form>

      </div>
    );
  }
  
  
        
    
}

export default CourseForm;