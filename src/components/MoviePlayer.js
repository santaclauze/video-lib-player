import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import {
  Close,
  Tooltip,
} from '@bootstrap-styled/v4';
import { FadeIn } from '@bootstrap-styled/motion';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  background-color:rgba(0,0,0,0.6);
  display: flex;
  z-index: 9999;
`

const PlayerWrapper = styled.div`
  margin: auto;
  position: relative;
`


const CloseMovie = styled(Close)`
  ${(props) => `
    position: absolute;
    top: ${props.mobile ? '90px' : '15px'};
    right: ${props.mobile ? '5px' : '25px'};
    z-index: 9999;
    opacity: 1 !important;
  `}

`;

class MoviePlayer extends React.Component {
  static propTypes = {
    /** @ignore */
    close: PropTypes.func.isRequired,
    /** @ignore */
    // eslint-disable-next-line react/require-default-props
    theme: PropTypes.object,
    /** Movie object */
    movieContent: PropTypes.object.isRequired,
    /** Activates mobile css view */
    mobile: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      // eslint-disable-next-line react/destructuring-assignment, react/no-access-state-in-setstate
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const {
      theme,
      close,
      movieContent,
      mobile,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <FadeIn
        duration={theme.motion['$motion-duration'].xs}
        timingFunction={theme.motion['$motion-timing-function'].easeIn}
      >
        <Wrapper>
          <PlayerWrapper>
            <CloseMovie onDismiss={close} mobile={mobile} id="close-tooltip" />
            <Tooltip
              placement="left"
              isOpen={isOpen}
              target="close-tooltip"
              toggle={this.handleToggle}
            >
              Close
            </Tooltip>
            <video controls autoPlay height="500" width={mobile ? '450' : '900'} onEnded={close}>
              <source src={movieContent.url} type={`video/${movieContent.format}`} />
            </video>
          </PlayerWrapper>
        </Wrapper>
      </FadeIn>
    );
  }
}

export default withTheme(MoviePlayer);
