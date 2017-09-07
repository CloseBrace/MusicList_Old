import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.compileFormData = this.compileFormData.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    // component state
    this.state = {
      email: '',
      password: '',
    };
  }

  // update state as email value changes
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.compileFormData();
    }
  }

  // update state as password value changes
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  compileFormData() {
    const { loginFunction } = this.props;
    const formData = this.state;
    loginFunction(formData);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-7 col-md-5 col-lg-4">
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="noreply@musiclist.com"
                value={this.state.email}
                onChange={this.handleEmailChange}
                onKeyPress={this.handleKeyPress}
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                onKeyPress={this.handleKeyPress}
              />
            </FormGroup>
            <Button onClick={this.compileFormData}>Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}
