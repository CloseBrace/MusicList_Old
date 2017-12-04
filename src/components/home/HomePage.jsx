import React from 'react';
import { Link } from 'react-router-dom';

import Sidebar from '../shared/Sidebar';

export default function HomePage(props) {
  const { latestAlbum } = props;
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8">
        <h1>Welcome to MusicList</h1>
        <p>
          This is a simple React app where you can look up artists you like and albums you own,
          and add them to your list. Got rid of an album or decided you&#39;re not that fond of an
          artist? Just remove them.
        </p>
        <ul>
          <li><h2><Link to="/artists">Search Artists</Link></h2></li>
          <li><h2><Link to="/albums">Search Albums</Link></h2></li>
        </ul>
      </div>
      <Sidebar latestAlbum={latestAlbum} />
    </div>
  );
}
