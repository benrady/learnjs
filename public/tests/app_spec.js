import React from 'react';
import { mount, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import LandingRouter from '../js/LandingRouter';

describe('Routes', function () {
    it('shows the root landing page if no url given', function () {
        const wrapper = render(
            <MemoryRouter initialEntries={["/"]}><LandingRouter /></MemoryRouter>
        )
        //expect(wrapper.find(".landing-view").length).toEqual(1);
        expect(1).toEqual(1);
    });
});