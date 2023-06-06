import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let event, EventWrapper;

  beforeEach(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  test('details are hidden by default', () => {
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(EventWrapper.find('div div')).toHaveLength(0);
  });

  test('button label shows "show details" when collapsed is true', () => {
    expect(EventWrapper.find('button').text()).toBe('show details');
  });

  test('details are toggled when "show details" button is clicked', () => {
    EventWrapper.find('button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(false);
  });

  test('button label shows "hide details" when collapsed is false', () => {
    EventWrapper.setState({ collapsed: false });
    expect(EventWrapper.find('button').text()).toBe('hide details');
  });

  test('details are hidden when "hide details" button is clicked', () => {
    EventWrapper.setState({ collapsed: false });
    EventWrapper.find('button').simulate('click');
    expect(EventWrapper.state('collapsed')).toBe(true);
    expect(EventWrapper.find('div div')).toHaveLength(0);
  });
});
