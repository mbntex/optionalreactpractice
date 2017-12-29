import React from 'react';
import MyList from './mylist.js';
var $ = require ('jquery');
var bodyParser = require('body-parser');


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {title: 'Mean Girls', year: 1999, imdb: 6.2, watched: false},
        {title: 'Hackers', year: 1998, imdb: 8.1, watched: false},
        {title: 'The Grey', year: 2009, imdb: 9.2, watched: false},
        {title: 'Sunshine', year: 1983, imdb: 8.0, watched: false},
        {title: 'Ex Machina', year: 2016, imdb: 7.8, watched: false}
      ],
      searchterm: '',
      displayitems: [],
      addmovie:''
    };
  }

  componentWillMount () {
    this.getDataFn();
    //this.setState({displayitems: this.state.movies});
    //console.log('WILL MOUNT RAN!');
  }

  getDataFn () {
    $.ajax({
      method: 'POST', 
      url: '/moviedata',
      data: {search: 'Martha Movie Test'},
      success: function(data) {
        //console.log('Client Get call success!');
        console.log('DATA SENT TO CLIENT FROM API = ', data);
        this.setState({movies: data, displayitems: data});
      }.bind(this),
      error: function(error) {
        console.log('Client Get call Error!', error);
      }
    })
  }


  getDBDataFn() {
    $.ajax({
      method: 'POST', 
      url: '/moviedataDB',
      data: {search: 'Martha Movie Test'},
      success: function(data) {
        console.log('DATA SENT TO CLIENT FROM DATABASE = ', data);
      }.bind(this),
      error: function(error) {
        console.log('Client Get call Error!', error);
      }
    })

  }

  changeFn(e) {
    this.setState({[e.target.id]: e.target.value});
  }

  submitSearchFn() {
    console.log('clicked');
    var temp = [];
    var found = false;
    for (var i = 0; i < this.state.movies.length; i++) {
      if (this.state.movies[i].title.indexOf(this.state.searchterm) !== -1) {
        temp.push(this.state.movies[i]);
        found = true;
      }
    }
    if (found === false) {
      this.setState({displayitems: [{title: 'Not Found'}]});
      this.setState({searchterm: ''});
    } else {
      this.setState({displayitems: temp});
      this.setState({searchterm: ''});
    }
  }

  submitMovieFn() {
    var oldState = this.state.movies;
    oldState.push({title: this.state.addmovie, watched: false});
    this.setState({movies: oldState});
    this.setState({addmovie: ''});
  }

  watchedToggleFn(e) {
    // console.log('clicked');
    // console.log(e.target.id);
    var oldState = this.state.movies;
    for (var i = 0; i < this.state.movies.length; i++) {
      if (oldState[i].title === e.target.id) {
        oldState[i].watched = !oldState[i].watched;
      }
    }
    this.setState({movies: oldState});
  }

  showWatchedFn() {
    var temp = [];
    for (var i = 0 ; i < this.state.movies.length; i++) {
      if (this.state.movies[i].watched === true) {
        temp.push(this.state.movies[i]);
      }
    }
    this.setState({displayitems: temp});
  }

  showUnWatchedFn() {
    var temp = [];
    for (var i = 0 ; i < this.state.movies.length; i++) {
      if (this.state.movies[i].watched === false) {
        temp.push(this.state.movies[i]);
      }
    }
    this.setState({displayitems: temp});
  }


  resetFn() {
    this.setState({displayitems: this.state.movies});
  }
 
  render() {
    return (
      <div>
        <p>Search</p>
        <input type="text" value={this.state.searchterm} id="searchterm" onChange={this.changeFn.bind(this)}></input>
        <button id="submitbutton" onClick={this.submitSearchFn.bind(this)}>Submit Search</button>
        <button id="submitbutton" onClick={this.resetFn.bind(this)}>Reset</button>
        <button id="submitbutton" onClick={this.getDataFn.bind(this)}>GET API DATA TEST</button>
        <button id="submitbutton" onClick={this.getDBDataFn.bind(this)}>GET DB TEST</button>
        <p>Add Movie</p>
        <input type="text" value={this.state.addmovie} id="addmovie" onChange={this.changeFn.bind(this)}></input>
        <button id="submitbutton" onClick={this.submitMovieFn.bind(this)}>Submit Movie</button><br/>
        <button onClick={this.showWatchedFn.bind(this)}>Watched</button><br/>
        <button onClick={this.showUnWatchedFn.bind(this)}>To Watch</button>
        <MyList data={this.state.displayitems} watchedFn={this.watchedToggleFn.bind(this)}/>
      </div>
    );
  }
}


export default App;


