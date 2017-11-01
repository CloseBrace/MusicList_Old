import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label } from 'reactstrap';

// helpers
const listAlbums = albums => albums.map(album =>
  (
    <p key={album.id}>
      <img src={album.thumb} alt="album thumbnail" />
      <strong>Title: {album.title}</strong><br />
    </p>
  ),
);

export default class AlbumsPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);

    // component state
    this.state = {
      searchText: '',
    };
  }

  // update state as search value changes
  handleSearchChange(e) {
    this.setState({ searchText: e.target.value });
  }

  // catch enter clicks
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.handleValidSubmit();
    }
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { searchAlbumsFunction } = this.props;
    const formData = this.state;
    searchAlbumsFunction(formData.searchText);
  }

  render() {
    const { albums } = this.props;
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <h2><Label for="search">Search Albums</Label></h2>
                <p>
                  Find albums you own and add them to your MusicList.
                  You can search by album title or artist name.
                </p>
                <AvInput
                  id="search"
                  name="search"
                  onChange={this.handleSearchChange}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Queens of the Stone Age"
                  required
                  type="text"
                  value={this.state.searchText}
                />
                <AvFeedback>Required</AvFeedback>
              </AvGroup>
              <Button color="primary">Search Albums</Button>
            </AvForm>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12">
            { albums && albums.length > 0 ? <div><hr /><h2>Albums</h2></div> : null }
            { albums && albums.length > 0 ? listAlbums(albums) : null }
          </div>
        </div>
      </div>
    );
  }
}
