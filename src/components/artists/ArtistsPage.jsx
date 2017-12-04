import React from 'react';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Button, Label, Table } from 'reactstrap';

export default class ArtistsPage extends React.Component {
  constructor(props) {
    super(props);

    // bound functions
    this.addArtist = this.addArtist.bind(this);
    this.createTable = this.createTable.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.listArtists = this.listArtists.bind(this);

    // component state
    this.state = {
      searchText: '',
    };
  }

  // update state as search value changes
  handleSearchChange(e) {
    this.setState({ searchText: e.target.value });
  }

  // Handle submission once all form data is valid
  handleValidSubmit() {
    const { searchArtistsFunction } = this.props;
    const formData = this.state;
    searchArtistsFunction(formData.searchText);
  }

  createTable(artists) {
    return (
      <Table striped responsive>
        <thead>
          <tr>
            <th />
            <th>Artist</th>
            <th />
          </tr>
        </thead>
        <tbody>
          { this.listArtists(artists) }
        </tbody>
      </Table>
    );
  }

  generateButton(user, artist) {
    return (
      user.artists.indexOf(artist.id) < 0 ?
        <Button color="primary" outline id={artist.id} onClick={this.addArtist}>
          Add To My List
        </Button> :
        <span>Already Listed</span>
    );
  }

  listArtists(artists) {
    const { user, authentication } = this.props;
    return artists.map(artist =>
      (
        <tr key={artist.id}>
          <td><img src={artist.thumb} alt="artist thumbnail" width="80" height="80" /></td>
          <td>{artist.title}</td>
          <td>{authentication.username.length > 0 ? this.generateButton(user, artist) : null}</td>
        </tr>
      ));
  }

  // Add an artist to the user's list
  addArtist(e) {
    const { addArtistFunction } = this.props;
    // get id from button and send to the API
    addArtistFunction(e.target.id);
  }

  render() {
    const { artists } = this.props;
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-7 col-md-5 col-lg-4">
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvGroup>
                <h2><Label for="search">Search Artists</Label></h2>
                <p>
                  Find artists you own and add them to your MusicList.
                </p>
                <AvInput
                  id="search"
                  name="search"
                  onChange={this.handleSearchChange}
                  onKeyPress={this.handleKeyPress}
                  placeholder="Lorde"
                  required
                  type="text"
                  value={this.state.searchText}
                />
                <AvFeedback>Required</AvFeedback>
              </AvGroup>
              <Button color="primary">Search Artists</Button>
            </AvForm>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-12">
            { artists && artists.length > 0 ? <h2>Artists</h2> : null }
            <div className="row">
              <div className="col-sm-12 col-lg-12">
                { artists && artists.length > 0 ? this.createTable(artists) : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
