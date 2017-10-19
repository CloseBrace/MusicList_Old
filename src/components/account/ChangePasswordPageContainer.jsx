import React from 'react';
import { connect } from 'react-redux';
import { savePassword } from '../../actions/authentication';

import ChangePasswordPage from './ChangePasswordPage';

export class ChangePasswordPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.sendPassword = this.sendPassword.bind(this);
  }

  sendPassword(formData) {
    const { dispatch } = this.props;
    const data = {
      hash: this.props.match.params.hash,
      password: formData.password,
    };
    dispatch(savePassword(data));
  }

  render() {
    return (
      <ChangePasswordPage sendPasswordFunction={this.sendPassword} />
    );
  }
}

export default connect()(ChangePasswordPageContainer);
