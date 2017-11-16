import React from 'react';

const formatAlbums = albums => albums.map(album => (
  <p key={album.discogsId}>
    <em>{album.title}</em> by
    {album.artists[0].name}
  </p>
));
const formatArtists = artists => artists.map(artist => <p key={artist.discogsId}>{artist.name}</p>);

export default class ArtistsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { username, albums, artists } = this.props;
    return (
      <div className="row">
        <div className="col-12 col-sm-12">
          <h2>{ username }&lsquo;s Profile</h2>
          <h3>Artists They Like</h3>
          <div>
            { artists.length > 0 ? formatArtists(artists) : null }
          </div>
          <h3>Albums They Own</h3>
          <div>
            { albums.length > 0 ? formatAlbums(albums) : null }
          </div>
        </div>
      </div>
    );
  }
}
