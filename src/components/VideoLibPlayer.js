import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Hr,
  H2,
} from '@bootstrap-styled/v4';


import Header from './Header';
import LoadingIcon from './LoadingIcon';
import Container from './Container';
import Movie from './Movie';
import Carousel from './Carousel';

export default class VideoLibPlayer extends React.Component {
  state = {
    /** List of previously watched movies ids. */
    previouslyWatchedMovieIds: [],
  };

  static propTypes = {
    /** Displays loading icon when true */
    isLoading: PropTypes.bool,
    /** Triggers user data fetch  */
    refreshMovieList: PropTypes.func,
    /**
     * Movie list object provided by user.
     * The object required is of following format:
     * {
     *   availableDate: 197856000000,
     *   categories : [
     *     {title: "Drama", description: "Drama movies", id: "movies-drama"},
     *     {title: "History", description: "History movies", id: "movies-history"}
     *   ],
     *   contents: [
     *     {
     *       url: "http://d2bqeap5aduv6p.cloudfront.net/project_coderush_640x360_521kbs_56min.mp4",
     *       format: "mp4",
     *       width: 1182,
     *       height: 665,
     *       language: "en",
     *       duration: 0,
     *       id: "vid_104"
     *       }
     *     }
     *   ],
     *   credits: [
     *    {
     *      name: "Alan J. Pakula",
     *      role: "Director"
     *    }
     *   ],
     *   description: "Reporters Woodward and Bernstein uncover the details of the Watergate scandal that leads to President Nixon's resignation."
     *   id: "all-the-president-s-men",
     *   images: [
     *    {
     *      type: "cover",
     *      url: "http://lorempixel.com/214/317/?t=26",
     *      width: 214,
     *      height: 317,
     *      id: "6753893d856068292e1b3d0c77f4786d"
     *    }
     *   ],
     *   metadata: [
     *      {value: "en", name: "language"}
     *    ],
     *    parentalRatings: [
     *      {
     *        scheme: "MPAA",
     *        rating: "R"
     *      }
     *    ],
     *    publishedDate: 197856000000
     *    title: "All the President's Men"
     *    type: "movie"
     * }
     *
     */
    movieList: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isLoading: false,
    refreshMovieList: null,
  }

  componentWillMount() {
    this.checkLocalStorage();
  }

  handleRefreshMovieList = () => {
    const { refreshMovieList } = this.props;
    if (refreshMovieList) {
      refreshMovieList();
    }
  };

  checkLocalStorage = () => {
    const locallyStoredPreviouslyWatchedMovies = localStorage.getItem('previouslyWatched');
    if (locallyStoredPreviouslyWatchedMovies !== null && locallyStoredPreviouslyWatchedMovies.split(',').length > 0) {
      this.setState({
        previouslyWatchedMovieIds: locallyStoredPreviouslyWatchedMovies.split(','),
      });
    }
  };

  getPreviouslyWatchedMovies = (movies) => {
    const { previouslyWatchedMovieIds } = this.state;
    const previouslyWatchedMovies = [];
    // eslint-disable-next-line array-callback-return
    previouslyWatchedMovieIds.map((watchedMovieId) => movies.map((movie) => {
      if (watchedMovieId === movie.id) {
        previouslyWatchedMovies.push(movie);
      }
    }));
    return previouslyWatchedMovies;
  };

  addMovieAtBeginningOfList = (movie, previouslyWatchedMovieIds) => {
    previouslyWatchedMovieIds.unshift(movie.id);
    this.setState({
      previouslyWatchedMovieIds,
    });
    localStorage.setItem('previouslyWatched', previouslyWatchedMovieIds);
  };

  changeMovieIndexToBeginning = (movie, previouslyWatchedMovieIds) => {
    // eslint-disable-next-line array-callback-return
    previouslyWatchedMovieIds.map((previouslyWatchedMovie, index) => {
      if (movie.id === previouslyWatchedMovie) {
        previouslyWatchedMovieIds.splice(index, index - 1);
        this.addMovieAtBeginningOfList(movie, previouslyWatchedMovieIds);
      }
    });
  };

  handleUpdatePreviouslyWatched = (movie) => {
    const { previouslyWatchedMovieIds } = this.state;
    const hasBeenWatchedIndex = previouslyWatchedMovieIds.find((previouslyWatchedMovie) => movie.id === previouslyWatchedMovie);
    if (hasBeenWatchedIndex === undefined) {
      this.addMovieAtBeginningOfList(movie, previouslyWatchedMovieIds);
    } else {
      this.changeMovieIndexToBeginning(movie, previouslyWatchedMovieIds);
    }
  };

  render() {
    const { isLoading, refreshMovieList, movieList } = this.props;

    return (
      <Fragment>
        <Header onRefreshClick={refreshMovieList ? this.handleRefreshMovieList : null} isLoading={isLoading} />
        {isLoading && isLoading ? (
          <div className="d-flex align-items-center justify-content-around">
            <LoadingIcon />
          </div>
        ) : (
          <Container>
            <div className="d-none d-sm-block">
              <H2>Featured Movies</H2>
              <Carousel movies={movieList} updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched} />
              <Hr className="my-5" />
              <H2>Previously Watched Movies</H2>
              <Carousel movies={this.getPreviouslyWatchedMovies(movieList)} updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched} />
            </div>
            <div className="d-sm-none">
              <H2>Featured Movies</H2>
              <div className="d-flex flex-wrap justify-content-around">
                {movieList.map((movie) => <Movie data={movie} key={movie.id} mobile updatePreviouslyWatchedList={this.handleUpdatePreviouslyWatched} />)}
              </div>
            </div>
          </Container>
        )}
      </Fragment>
    );
  }
}
