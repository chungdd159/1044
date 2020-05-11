import React, { Component } from 'react';
import axios from 'axios';
import Spin from '../layout/Spin';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Lyrics extends Component {
  state = {
    lyrics: {},
    track: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=8ea19c3309780dff0ad4bf449c027828`
    );

    this.setState({ lyrics: res.data.message.body.lyrics });

    const restrack = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=8ea19c3309780dff0ad4bf449c027828`
    );

    this.setState({ track: restrack.data.message.body.track });
  }

  render() {
    const { lyrics, track } = this.state;
    if (
      lyrics === undefined ||
      track === undefined ||
      Object.keys(lyrics).length === 0 ||
      Object.keys(track).length === 0
    ) {
      return <Spin />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark btn-sm mb-4">
            Go Back
          </Link>
          <div className="card">
            <h5 className="card-header">
              {track.track_name} By{' '}
              <span className="text-secondary">{track.artist_name}</span>
            </h5>
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID</strong>: {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Explicit Word</strong>:{' '}
              {track.explicit === 0 ? 'NO' : 'YES'}
            </li>
            <li className="list-group-item">
              <strong>First Release Day</strong>:{' '}
              <Moment format="MM/DD/YYYY">{track.first_release_day}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
