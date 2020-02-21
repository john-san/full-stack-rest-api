import React from 'react';

const FormErrors = ({errors}) => {
  return (
    <div>
      {
        errors.length ?
          <div className="validation-errors">
            <h2 className="validation--errors--label">Validation errors</h2>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
        :
          null
      }
    </div>
  );
};

export default FormErrors;