import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Template from './Template';
import { sessionCheckFailure, sessionCheckSuccess } from '../actions/authentication';

class TemplateContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.checkSession = this.checkSession.bind(this);
  }

  componentWillMount() {
    // Before the component mounts, check for an existing user session
    this.checkSession();
  }

  async checkSession() {
    const { sessionCheckFailureAction, sessionCheckSuccessAction } = this.props;
    // contact the API
    await fetch(
      // where to contact
      '/api/authentication/checksession',
      // what to send
      {
        method: 'GET',
        credentials: 'same-origin',
      },
    )
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((json) => {
      if (json.username) {
        sessionCheckSuccessAction(json);
      } else {
        sessionCheckFailureAction();
      }
    })
    .catch((error) => {
      sessionCheckFailureAction(error);
    });
  }

  render() {
    const { authentication, progress } = this.props;
    return (
      <Template progress={progress} authentication={authentication} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sessionCheckFailureAction: sessionCheckFailure,
    sessionCheckSuccessAction: sessionCheckSuccess,
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    progress: state.progress,
    authentication: state.authentication,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateContainer);
