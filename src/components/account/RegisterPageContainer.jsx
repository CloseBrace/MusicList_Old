import React from 'react';
import { connect } from 'react-redux';

import RegisterPage from './RegisterPage';

export class RegisterPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.registerFunction = this.registerFunction.bind(this);
  }

  registerFunction(userData) {
    const { dispatch } = this.props;
    // dispatch(registerUser(userData));
    console.log(userData);
  }

  render() {
    return (
      <div>
        <RegisterPage registerFunction={this.registerFunction} />
      </div>
    );
  }
}

export default connect()(RegisterPageContainer);
