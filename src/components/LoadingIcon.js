import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const StyledLoadingIcon = styled(FontAwesomeIcon)`
  color: #08080A;
`;
const LoadingIcon = () => (
  <StyledLoadingIcon icon="spinner" className="fa-pulse text-white fa-3x" />
);

export default LoadingIcon;
