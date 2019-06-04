import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';

import {
  Navbar,
  Button,
  H1,
  Tooltip,
} from '@bootstrap-styled/v4';

import Container from './Container';

export default class Header extends React.Component {

  static propTypes = {
    // eslint-disable-next-line react/require-default-props
    onRefreshClick: PropTypes.func,
    isLoading: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
  };

  handleClick = () => {
    this.props.onRefreshClick();
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };


  render() {
    const { isOpen } = this.state;
    const { isLoading, onRefreshClick } = this.props;

    return (
      <Navbar>
        <Container className="d-flex flex-row justify-content-between">
          <H1>Home</H1>
          {onRefreshClick && (
            <Fragment>
              <Button
                color="success"
                onClick={this.handleClick}
                id="tooltip-button"
                disabled={isLoading}
              >
                <FontAwesomeIcon icon="redo" className={cn(isLoading && 'fa-spin')} />
              </Button>
              <Tooltip
                placement="left"
                isOpen={isOpen}
                target="tooltip-button"
                toggle={this.handleToggle}
              >
                Refresh
              </Tooltip>
            </Fragment>
          )}
        </Container>
      </Navbar>
    );
  }
}
