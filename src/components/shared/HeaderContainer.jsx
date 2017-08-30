import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { incrementProgress, decrementProgress } from '../../actions/progress';
import { logoutFailure, logoutSuccess } from '../../actions/authentication';

import Header from './Header';

class HeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.logUserOut = this.logUserOut.bind(this);
  }

  async logUserOut() {
    const {
      decrementProgressAction,
      incrementProgressAction,
      logoutFailureAction,
      logoutSuccessAction,
    } = this.props;

    // turn on spinner
    incrementProgressAction();

    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/logout',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return logoutSuccessAction();
      }
      return logoutFailureAction(`Error: ${response.status}`);
    })
    .catch((error) => {
      logoutFailureAction(error);
    });

    // turn off spinner
    decrementProgressAction();
  }

  render() {
    const { authentication } = this.props;
    return (
      <Header authentication={authentication} logUserOut={this.logUserOut} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    incrementProgressAction: incrementProgress,
    decrementProgressAction: decrementProgress,
    logoutFailureAction: logoutFailure,
    logoutSuccessAction: logoutSuccess,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(HeaderContainer);
