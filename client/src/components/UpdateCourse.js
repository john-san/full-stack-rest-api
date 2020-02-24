import React, { Component } from 'react';
import CourseForm from './subcomponents/CourseForm';

export default class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourse: {},
      currentCourseOwner: {},
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    }

   this.getCourse();
  }

  async getCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const currentCourse = await context.data.getCourse(id);
      this.setState({ 
        currentCourse, 
        currentCourseOwner: currentCourse.User,
        title: currentCourse.title,
        description: currentCourse.description,
        estimatedTime: currentCourse.estimatedTime,
        materialsNeeded: currentCourse.materialsNeeded
      });
    } catch(err) {
      console.log(err);
    }
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  submit = async () => {
    try {
      const { context, match } = this.props;
      const {
        title,
        description,
        estimatedTime,
        materialsNeeded
      } = this.state; 

      const { emailAddress, password, id: userId } = context.authenticatedUser; 

      // New course payload
      const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded,      
        emailAddress,
        password,
        userId,
        id: match.params.id
      };

      const response = await context.data.updateCourse(course, emailAddress, password);

      // Successful course update
      if (response.status === 204) {
        console.log('updated!', response);
        this.props.history.push('/');  
        // Validation Errors
      } else if (response.status === 400) {
        console.log('Uh oh', response);
        this.handleErrors(response.errors);
      }
    } catch(err) {
      console.log(err);
      this.props.history.push('/error');
    }
  }

  handleErrors(err) {
    const errors = Object.values(err)[0]
      .map(item => Object.values(item)[0]);
    this.setState({ errors });
  }

  cancel = () => {
    this.props.history.push('/');
  }

  render() {
    const { change, submit, cancel } = this;  
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      currentCourseOwner
    } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>

        <CourseForm 
          change={change}
          submit={submit}
          cancel={cancel}
          title={title}
          description={description}
          estimatedTime={estimatedTime}
          materialsNeeded={materialsNeeded}
          errors={errors}
          submitButtonText="Update Course"
          courseOwnerName={`${currentCourseOwner.firstName} ${currentCourseOwner.lastName}`}
        />
      </div>
    );

  }
}