import React from 'react';
import FormErrors from './FormErrors';

const UserForm = (props) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
    submit();
  }

  function handleCancel(e) {
    e.preventDefault();
    cancel();
  }

  return (
    <div>
      <FormErrors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div>
          {elements()}
        </div>
        <div class="grid-100 pad-bottom">
          <button class="button" type="submit">{submitButtonText}</button>
          <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;