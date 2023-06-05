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
    expect(EventWrapper.state('showDetails')).toBe(false);
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
  });

  test('button label shows "Show Details" when showDetails is false', () => {
    expect(EventWrapper.find('.details-button').text()).toBe('Show Details');
  });

  test('details are toggled when Show Details button is clicked', () => {
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(true);
  });

  test('button label shows "Hide Details" when showDetails is true', () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.details-button').text()).toBe('Hide Details');
  });

  test('details are hidden when "Hide Details" button is clicked', () => {
    EventWrapper.setState({ showDetails: true });
    EventWrapper.find('.details-button').simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(false);
    expect(EventWrapper.find('.event-details')).toHaveLength(0);
  });

  test('event details are rendered when showDetails is true', () => {
    EventWrapper.setState({ showDetails: true });
    expect(EventWrapper.find('.event-details')).toHaveLength(1);
    expect(EventWrapper.find('.event-details').text()).toBe(event.description);
  });
});
