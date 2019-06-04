import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import styled, { withTheme } from 'styled-components';

import Movie from './Movie';

class CarouselUnstyled extends React.Component {

  static propTypes = {
    movies: PropTypes.array,
    updatePreviouslyWatchedList: PropTypes.func,
    theme: PropTypes.object,
  };

  render() {
    const { movies, theme } = this.props;

    const settings = {
      infinite: false,
      dots: true,
      speed: 500,
      draggable: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: parseInt(theme['$grid-breakpoints'].lg, 10),
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };

    return (
      <Slider {...settings} className={this.props.className}>
        {movies && movies.map((movie, index) =>
          <Movie
            updatePreviouslyWatchedList={this.props.updatePreviouslyWatchedList}
            data={movie}
            key={index}
          />,
        )}
      </Slider>
    );
  }
}

const Carousel = styled(CarouselUnstyled)`
  .slick-arrow {
    z-index: 9998
    &.slick-prev {
      top: 40%;
    }
    &.slick-next {
      top: 40%;
    }
  }
`;

export default withTheme(Carousel);
