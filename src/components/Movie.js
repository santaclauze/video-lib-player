import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import cn from 'classnames';
import {
  Img,
  P,
  Badge,
  Small,
  Hr
} from '@bootstrap-styled/v4';
import { mediaBreakpointDown } from '@bootstrap-styled/css-mixins/lib/breakpoints';

import MoviePlayer from './MoviePlayer';

const MovieWrapper = styled.div`
  width: 215px;
  height: 350px;
`;

const MovieImg = styled(Img)`
  min-height: 250px;
`;

class MovieUnstyled extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    className: PropTypes.string,
    updatePreviouslyWatchedList: PropTypes.func,
    mobile: PropTypes.bool,
  };

  state = {
    movieOpen: false,
    movieBase64: null,
    movieHover: false,
  };

  componentWillMount() {
    let imageBase64;
    const { data } = this.props;
    if (localStorage.getItem(data.id) === null) {
      fetch(`https://cors-anywhere.herokuapp.com/${data.images[0].url}`)
        .then((r) => r.blob())
        .then((blob) => new Promise((res, rej) => {
          const fl = new FileReader();
          fl.onload = (e) => res(e.target.result);
          fl.onerror = rej;
          fl.readAsDataURL(blob);
        }))
        .then((result) => {
          imageBase64 = result.replace('data:text/html', 'data:image/jpeg');
          this.setState({
            movieBase64: imageBase64,
          });
          localStorage.setItem(data.id, imageBase64);
        });
    } else {
      this.setState({
        movieBase64: localStorage.getItem(data.id),
      });
    }
  }

  handleCloseVideo = () => {
    const { updatePreviouslyWatchedList, data } = this.props;
    this.setState({
      movieOpen: false,
    });
    // eslint-disable-next-line no-unused-expressions
    updatePreviouslyWatchedList && updatePreviouslyWatchedList(data);
  };

  handleOpenVideo = () => {
    this.setState({
      movieOpen: true,
    });
  };

  handleOnMouseOver = () => {
    this.setState({
      movieHover: true,
    });
  };

  handleOnMouseLeave = () => {
    this.setState({
      movieHover: false,
    });
  };

  render() {
    const { data, className, mobile } = this.props;
    const { movieBase64, movieHover, movieOpen } = this.state;

    return (
      <Fragment>
        <MovieWrapper
          className={cn(className, 'movie-wrapper cursor-pointer')}
          onClick={this.handleOpenVideo}
          onMouseOver={this.handleOnMouseOver}
          onMouseLeave={this.handleOnMouseLeave}
          onFocus={this.handleOnMouseOver}
          onBlur={this.handleOnMouseLeave}
        >
          <MovieImg
            src={movieBase64}
            alt={data.id}
            className="cursor-pointer movie-image"
          />
          {movieHover && (
            <div className="movie-description text-white p-2">
              <Small>{data.description}</Small>
              <Hr />
              <Small>
                Rating: { data.parentalRatings[0].rating }
              </Small>
              <Hr />
              {data.categories.map((category) =>
                <Badge
                  className="ml-1"
                  key={category}
                >
                  {category.title}
                </Badge>)}
            </div>
          )}
          <P className="text-white">{data.title}</P>
        </MovieWrapper>
        {movieOpen ? ReactDOM.createPortal(
          <MoviePlayer mobile={mobile} close={this.handleCloseVideo} movieContent={data.contents[0]} />,
          document.body
        ) : null}
      </Fragment>
    );
  }
}

const Movie = styled(MovieUnstyled)`
  ${(props) => `
    &.movie-wrapper {
      position: relative;
  
      .movie-description {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    ${mediaBreakpointDown('sm', props.theme['$grid-breakpoints'], `
      &.movie-wrapper, .movie-image, .movie-description {
        max-width: 175px;
      }
    `)}
  `}
`;

export default Movie;
