import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { username } = props;
  return (
    <header>
      <h1>MusicList</h1>
      <div className="user-menu">
        <h2>Welcome { username }</h2>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/account/profile/cwbuecheler">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
