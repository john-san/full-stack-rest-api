import React from 'react';

const FormErrors = (props) => {
  return (
    <div>
      {
        props.errors.length > 0 ?
          <div className="validation-errors">
            <h2 className="validation--errors--label">Validation errors</h2>
            <ul>
              {props.errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        :
          false
      }
    </div>
  );
};

export default FormErrors;