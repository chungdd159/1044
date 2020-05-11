import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACK':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Result',
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  async componentDidMount() {
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=8ea19c3309780dff0ad4bf449c027828`
    );
    this.setState({ track_list: res.data.message.body.track_list });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
