import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  let NumberOfEventsWrapper;

  test('User can update the number of events', ({ given, when, then }) => {
    given('the Number of Events component is rendered', () => {
      NumberOfEventsWrapper = mount(<NumberOfEvents updateEvents={() => {}} />);
    });

    then('the default number of events is 32', () => {
      expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(
        32
      );
    });

    when('the user enters a new value in the input field', () => {
      const inputField = NumberOfEventsWrapper.find('.number-input');
      inputField.simulate('change', { target: { value: 20 } });
    });

    then(
      'the events list should update with the specified number of events',
      () => {
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(
          20
        );
      }
    );
  });
});
