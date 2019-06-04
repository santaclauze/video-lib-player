import styled from 'styled-components';
import { mediaBreakpointUp } from '@bootstrap-styled/css-mixins/lib/breakpoints';

const Container = styled.div`
    ${(props) => `
        margin-right: auto;
        margin-left: auto;
        padding-left: 10px;
        padding-right: 10px;
        ${mediaBreakpointUp('sm', props.theme['$grid-breakpoints'], `
            width: 540px;
        `)}
        ${mediaBreakpointUp('md', props.theme['$grid-breakpoints'], `
            width: 760px;
        `)}
        ${mediaBreakpointUp('lg', props.theme['$grid-breakpoints'], `
            width: 960px;
        `)}
        ${mediaBreakpointUp('xl', props.theme['$grid-breakpoints'], `
            width: 1150px;
        `)}
    `}
`;

export default Container;
