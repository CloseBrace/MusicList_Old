import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

export default class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.clearPasswordReset = this.clearPasswordReset.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    // component state
    this.state = {
      email: '',
    };
  }

  // clear out the email form if we're rendering the success message
  componentWillReceiveProps(nextProps) {
    const { isPasswordReset } = nextProps;
    if (isPasswordReset) {
      this.setState({ email: '' });
    }
  }

  // show the form again so a new email can be sent
  clearPasswordReset(e) {
    e.preventDefault();
    const { clearPasswordResetFunction } = this.props;
    clearPasswordResetFunction();
  }

  // update state as email value changes
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleValidSubmit();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { resetPasswordFunction } = this.props;
    const formData = this.state;
    resetPasswordFunction(formData.email);
  }

  render() {
    const { isPasswordReset } = this.props;

    if (isPasswordReset) {
      return (
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <p>
              An email has been sent to the address you provided containing a link to reset
              your password. Please click that link to proceed with setting a new password.
            </p>
            <p>
              <a href="/account/reset-password" onClick={this.clearPasswordReset}>Re-send Email</a>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <p>
            If you&lsquo;d like to reset your password, please enter your email here
            and a link to do so will be sent to the address you enter.
          </p>
          <AvForm onValidSubmit={this.handleValidSubmit}>
            <AvGroup>
              <Label for="userEmail">Email</Label>
              <AvInput
                id="userEmail"
                name="email"
                onChange={this.handleEmailChange}
                onKeyPress={this.handleKeyPress}
                placeholder="noreply@musiclist.com"
                required
                type="email"
                value={this.state.email}
              />
              <AvFeedback>A valid email is required to reset your password.</AvFeedback>
            </AvGroup>
            <Button color="primary">Reset Password</Button>
          </AvForm>
        </div>
      </div>
    );
  }
}
