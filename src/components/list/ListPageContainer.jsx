import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteAlbum, populateAlbums } from '../../actions/albums';
import { deleteArtist, populateArtists } from '../../actions/artists';
import { userClearList, userLookup } from '../../actions/users';

import ListPage from './ListPage';

class ListPageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      albumsChecked: false,
      artistsChecked: false,
    };
  }

  componentWillMount() {
    // Before the component mounts, look up the user
    const { match, userLookupFunction } = this.props;
    userLookupFunction(match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    const { populateAlbumsFunction, populateArtistsFunction } = this.props;
    const { list } = nextProps;
    if (list.username !== '' && !this.state.albumsChecked) {
      populateAlbumsFunction(list.albums);
      this.setState({ albumsChecked: true });
    }
    if (list.username !== '' && !this.state.artistsChecked) {
      this.setState({ artistsChecked: true });
      populateArtistsFunction(list.artists);
    }
  }

  componentWillUnmount() {
    const { userClearListFunction } = this.props;
    userClearListFunction();
  }

  render() {
    const { authentication, deleteAlbumFunction, deleteArtistFunction, list } = this.props;
    if (list.username === '') {
      return (<p />);
    }

    return (
      <ListPage
        albums={list.albumsPopulated}
        artists={list.artistsPopulated}
        authentication={authentication}
        deleteAlbumFunction={deleteAlbumFunction}
        deleteArtistFunction={deleteArtistFunction}
        username={list.username}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteAlbumFunction: deleteAlbum,
  deleteArtistFunction: deleteArtist,
  populateAlbumsFunction: populateAlbums,
  populateArtistsFunction: populateArtists,
  userClearListFunction: userClearList,
  userLookupFunction: userLookup,
  dispatch,
}, dispatch);

const mapStateToProps = state => ({
  authentication: state.authentication,
  list: state.list,
});

export default connect(mapStateToProps, mapDispatchToProps)(ListPageContainer);
