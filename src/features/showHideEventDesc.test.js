import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideEventDesc.feature');

defineFeature(feature, (test) => {
  //1
  test('Event description is hidden by default', ({ given, then }) => {
    let EventWrapper;

    given('an Event component is rendered', () => {
      const event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
    });

    then('the event details should be hidden', () => {
      expect(EventWrapper.find('.event-details')).toHaveLength(0);
    });

    then('the "show details" button should be displayed', () => {
      expect(EventWrapper.find('.details-btn')).toHaveLength(1);
    });
  });
  //2
  test('User can show event description', ({ given, when, then }) => {
    let EventWrapper;

    given('an Event component is rendered', () => {
      const event = mockData[0];
      EventWrapper = mount(<Event event={event} />);
    });

    given('the event details are hidden', () => {
      EventWrapper.setState({ collapsed: true });
    });

    when('the user clicks on the "show details" button', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event details should be displayed', () => {
      expect(EventWrapper.find('div > div > h3')).toHaveLength(1);
    });
  });
  //3
  test('User can hide event description', ({ given, when, then }) => {
    let EventWrapper;

    given('an Event component is rendered', () => {
      const event = mockData[0];
      EventWrapper = mount(<Event event={event} />);
    });

    given('the event details are displayed', () => {
      EventWrapper.setState({ showDetails: true });
    });

    when('the user clicks on the "hide details" button', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event details should be hidden', () => {
      expect(EventWrapper.find('.event-description')).toHaveLength(0);
    });
  });
});
