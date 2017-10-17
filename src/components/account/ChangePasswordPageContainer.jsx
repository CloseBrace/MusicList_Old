import React from 'react';
import { connect } from 'react-redux';

import ChangePasswordPage from './ChangePasswordPage';

export class ChangePasswordPageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hash } = this.props.match.params;
    return (
      <ChangePasswordPage hash={hash} />
    );
  }
}

export default connect()(ChangePasswordPageContainer);
