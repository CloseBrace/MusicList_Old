import React from 'react';
import { Alert } from 'reactstrap';

export default function ErrorBox(props) {
  const { closeErrorFunction } = props;
  const { error, isError } = props.errorStore;
  return (
    <div className="row justify-content-center">
      <div className="col-6">
        <Alert color="danger" isOpen={isError} toggle={closeErrorFunction}>
          <strong>Error:</strong> {error && error.message ? error.message : 'An undefined error occurred' }
        </Alert>
      </div>
    </div>
  );
}
