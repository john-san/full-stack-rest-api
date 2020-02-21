import React from 'react';

const FormErrors = (props) => {
  return (
    <div>
      <h2 className="validation--errors--label">Validation errors</h2>
      <div className="validation-errors">
        <ul>
          {props.errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default FormErrors;