import React from 'react';
import CourseForm from './subcomponents/CourseForm';

const CreateCourse = (props) => {
  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>

      <CourseForm 
        match={props.match} 
        history={props.history}
      />
    </div>
  );
}

export default CreateCourse;