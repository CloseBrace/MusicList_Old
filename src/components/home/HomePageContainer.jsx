import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLatestAlbum } from '../../actions/albums';

import HomePage from './HomePage';

export class HomePageContainer extends React.Component {
  componentWillMount() {
    const { getLatestAlbumFunction } = this.props;
    getLatestAlbumFunction();
  }

  render() {
    const { latestAlbum } = this.props;
    return (
      <HomePage
        latestAlbum={latestAlbum}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getLatestAlbumFunction: getLatestAlbum,
  dispatch,
}, dispatch);
const mapStateToProps = state => ({ latestAlbum: state.latest });

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
