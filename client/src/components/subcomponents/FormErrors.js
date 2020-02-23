import React from 'react';

export default ({ errors }) => {
  return (
    <div>
      {
        errors.length > 0 &&
          <div className="validation-errors">
            <h2 className="validation--errors--label">Validation errors</h2>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>
      }
    </div>
  );
};