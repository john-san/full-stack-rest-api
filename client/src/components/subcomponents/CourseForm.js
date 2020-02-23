import React, { Component } from 'react';
import FormErrors from './FormErrors';
import axios from 'axios';
import config from '../../config';

class CourseForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      errors: []
    }

    const inputs = ['title', 'description', 'estimatedTime', 'materialsNeeded'];
    inputs.forEach(input => this[input] = React.createRef());
  }

   handleSubmit = async (e) => {
    try {
      const { method } = this.props;
      e.preventDefault();
      let url = `${config.apiBaseUrl}/courses`;
      const body = { 
        userId: 1, 
        title: this.title.current.value,
        description: this.description.current.value,
        estimatedTime: this.estimatedTime.current.value,
        materialsNeeded: this.materialsNeeded.current.value
      };

      if (method === "put") { 
        url += `/${this.props.match.params.id}`;
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
      if (method === "put") {
        this.props.history.push(`/courses/${this.props.match.params.id}/view`);
      } else {
        this.props.history.push("/");
      }
      
    } catch (err) {
      this.handleErrors(err);
    }
  }

  handleErrors(err) {
    const errors = Object.values(err.response.data)[0]
      .map(item => Object.values(item)[0]);
    this.setState({ errors });
  }


  render() {
    const { submitButtonText, course } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <FormErrors errors={errors} />
        
        <form onSubmit={this.handleSubmit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <input 
                id="title" 
                name="title" 
                type="text" 
                className="input-title course--title--input" 
                placeholder="Course title..." 
                ref={this.title}
                defaultValue={course ? course.title : ""}
              />
              <p>By Joe Smith</p>
            </div>
    
            <div className="course--description">
              <textarea 
                id="description" 
                name="description"  
                placeholder="Course description..."
                ref={this.description}
                defaultValue={course ? course.description : ""}
              >
              </textarea>
            </div>
          </div>
    
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time (Hours)</h4>
                  <input 
                    id="estimatedTime" 
                    name="estimatedTime" 
                    type="number" 
                    className="course--time--input" 
                    placeholder="Hours" 
                    ref={this.estimatedTime}
                    defaultValue={course ? course.estimatedTime : ""}
                  />
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <textarea 
                    id="materialsNeeded" 
                    name="materialsNeeded" 
                    placeholder="List materials..."
                    ref={this.materialsNeeded}
                    defaultValue={course ? course.materialsNeeded : ""}
                  >
                  </textarea>
                </li>
              </ul>
            </div>
          </div>
    
          <div className="grid-100 pad-bottom">
            <div>
              <button className="button" type="submit">{submitButtonText}</button>
              <a className="button button-secondary" href="/">Cancel</a>
            </div>
          </div>
    
        </form>

      </div>
    );
  }
  
}

export default CourseForm;