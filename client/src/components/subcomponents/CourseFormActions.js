import React from 'react';

const CourseFormActions = (props) => {
  return (
    <div className="grid-100 pad-bottom">
      {
        
        props.location === "update" ?
          <div>
            <button className="button" type="submit">Update Course</button>
            <a className="button button-secondary" href={`/courses/${props.match.params.id}/view`}>Cancel</a>
          </div>
          
        :
          <div>
            <button className="button" type="submit">Create Course</button>
            <a className="button button-secondary" href="/">Cancel</a>
          </div>
      }
    
    </div>
  );
}

export default CourseFormActions;