import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../Header';


describe('<Header />', () => {
    it('should render an <Header> tag', () => {
        const renderedComponent = shallow(<Header />);
        expect(renderedComponent.find('Navbar').length).toBe(1);
        expect(renderedComponent.find('Button').length).toBe(1);
    });
    it('should handleCLick when clicking on button', () => {
        const onClick = jest.fn();
        const renderedComponent = mount(<Header onRefreshClick={onClick}  />);
        renderedComponent.find('Button').simulate('click');
        expect(onClick).toHaveBeenCalledWith();
    });
});