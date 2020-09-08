import * as React from "react";
import {shallow, ShallowWrapper, configure } from "enzyme";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Card from '../../components/card.component';
import { mockUser } from '../mocks/users.mock';


Enzyme.configure({adapter: new Adapter()})


describe('Card component', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(<Card gnome={mockUser} />)
  });
  it('should match snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  })
});