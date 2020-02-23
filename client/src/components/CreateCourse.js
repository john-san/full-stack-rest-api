import React from 'react';
import CourseForm from './subcomponents/CourseForm';

export default ({ match, history }) => {
  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>

      <CourseForm 
        match={match} 
        history={history}
        submitButtonText="Create Course"
        method="post"
      />
    </div>
  );
}