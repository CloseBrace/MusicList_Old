import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const renderLogin = () => (
  <Nav className="ml-auto" navbar>
    <NavItem>
      <NavLink tag={Link} to="/account/login">Log In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/account/register">Register</NavLink>
    </NavItem>
  </Nav>
);

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.logOutClick = this.logOutClick.bind(this);
    this.renderGreeting = this.renderGreeting.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  logOutClick(e) {
    e.preventDefault();
    const { logUserOutFunction } = this.props;
    logUserOutFunction();
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderGreeting(name) {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <span className="nav-link">Welcome, {name}
          &nbsp;| <a href="/logout" onClick={this.logOutClick}>Log Out</a>
          </span>
        </NavItem>
      </Nav>
    );
  }

  render() {
    const { isLoggedIn, firstName, username } = this.props.authentication;
    return (
      <header className="wrapper">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">MusicList</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/albums">Albums</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/artists">Artists</NavLink>
              </NavItem>
              { username && username !== '' ?
                <NavItem>
                  <NavLink tag={Link} to={`/list/${username}`}>My List</NavLink>
                </NavItem>
              : null }
            </Nav>
            { isLoggedIn ? this.renderGreeting(firstName) : renderLogin() }
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
