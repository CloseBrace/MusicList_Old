import React from 'react';
import { connect } from 'react-redux';
import { registrationSuccessViewed } from '../../actions/authentication';

import RegistrationSuccessPage from './RegistrationSuccessPage';

export class RegistrationSucessPageContainer extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(registrationSuccessViewed());
  }

  render() {
    return (
      <div>
        <RegistrationSuccessPage />
      </div>
    );
  }
}

export default connect()(RegistrationSucessPageContainer);
