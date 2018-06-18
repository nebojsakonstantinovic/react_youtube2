import _ from 'lodash';
import React, { Component } from 'react'
import ReactDom from 'react-dom';
import YTSeacrh from 'youtube-api-search';
import { SearchBar, VideoList, VideoDetail } from './components';


const API_KEY = 'AIzaSyCfDHSQ0t56OHyJX4m5WPb3qesztdDhgQM';



class App extends Component {
  constructor(props) {
    super(props)

    this.state ={
      videos: [],
      selectedVideo: null,
    }

    this.videoSearch('Rundek');
  }

  videoSearch(term) {
    YTSeacrh({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}></VideoDetail>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    )
  }
}

ReactDom.render(<App />, document.querySelector('.container'));


