import React from 'react';
import { connect } from 'react-redux';
import { albumSearchClear, searchAlbums } from '../../actions/albums';

import AlbumsPage from './AlbumsPage';

export class AlbumsPageContainer extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.searchAlbumsFunction = this.searchAlbumsFunction.bind(this);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(albumSearchClear());
  }

  searchAlbumsFunction(searchText) {
    const { dispatch } = this.props;
    dispatch(searchAlbums(searchText));
  }

  render() {
    const { albums } = this.props;
    return (
      <AlbumsPage
        albums={albums}
        searchAlbumsFunction={this.searchAlbumsFunction}
      />
    );
  }
}

const mapStateToProps = state => ({ albums: state.albums });

export default connect(mapStateToProps)(AlbumsPageContainer);
