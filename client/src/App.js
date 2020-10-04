import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Movie from "./components/MovieComponent";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    state = {
        movies: [],
        originalMovies: null
    };

  componentDidMount() {
      this.getPopularMovies().then((response) => {
          this.setState({movies: response.results, originalMovies: response.results});
      });
  }

  getPopularMovies = async () => {
      const response = await fetch('/getPopular');

      return await response.json();
  };

  sortByRating = () => {
      const movies = [...this.state.movies];
      const sortedByRating = movies.sort((a, b) => b.vote_average - a.vote_average);

      this.setState({movies: sortedByRating });
  };

  sortByTitle = () => {
      const movies =  [...this.state.movies];
      const sortedByTitle = movies.sort(function(a, b) {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
      });

      this.setState({movies: sortedByTitle });
  };

  resetFiltering = () => {
      const searchInputs = document.querySelectorAll('.search');

      searchInputs.forEach(input => input.value = '');
      this.setState({movies: this.state.originalMovies});
  };

  searchPopularMovies = (event) => {
    const originalMovies = this.state.originalMovies;
    const searchTerm = event.target.value.toLowerCase();
    const foundMovies = originalMovies.filter((movie) => movie.title.toLowerCase().indexOf(searchTerm) >= 0);

    this.setState({movies: foundMovies ? foundMovies : originalMovies});
  };

  getNewMovie = async (event) => {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm.length) {
        const response = await fetch('/getNewMovie', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({searchTerm})
        });
        return await response.json().then((response) => this.setState({movies: response.results}));
    } else {
        this.setState({movies: this.state.originalMovies});
    }
  };

  render() {
    const noMoviesFoundMessage = 'This movie was not found. Please search popular movies again with a different term, or search for a new movie.';
    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
                <input className="search form-control mr-sm-2" type="text" placeholder="Search Top 20 Movies" onChange={this.searchPopularMovies} aria-label="Search"/>
                <input className="search form-control mr-sm-2" type="text" placeholder="Search New Movie" onChange={this.getNewMovie} aria-label="Search"/>
                <button type="button" className="btn btn-primary " onClick={this.sortByRating}>Sort By Rating</button>
                <button type="button" className="btn btn-primary" onClick={this.sortByTitle}>Sort By Movie Title</button>
                <button type="button" className="btn btn-primary" onClick={this.resetFiltering}>Reset To Top Movies</button>
            </nav>
            <Table striped bordered hover>
                {this.state.movies.length ?
                    <thead>
                        <tr>
                            <th>id</th>
                            <td>Poster</td>
                            <th>Movie Title</th>
                            <th>Release Data</th>
                            <th>Popularity</th>
                            <th>Average Rating</th>
                            <th>Overview</th>
                        </tr>
                    </thead> : null}
                <tbody>
                {this.state.movies.map(({id, title, release_date, popularity, vote_average, overview, poster_path}) => {
                    return <Movie key={id}
                                  title={title}
                                  id={id}
                                  release_date={release_date}
                                  popularity={popularity}
                                  average_rating={vote_average}
                                  overview={overview} poster={poster_path}/>
                })}
                {this.state.movies.length ? null : <tr><td className="notFound">{noMoviesFoundMessage}</td></tr>}
                </tbody>
            </Table>
        </div>
    );
  }
}

export default App;