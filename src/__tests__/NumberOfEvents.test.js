import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  const mockUpdateEventsFunc = jest.fn();

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateEvents={mockUpdateEventsFunc} />
    );
  });

  test('renders text input', () => {
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
  });

  test('updates state when text input changes', () => {
    const eventObject = { target: { value: '10' } };
    NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual('10');
  });

  test('renders default number of events if no value is provided', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual('10');
  });
});

describe('<NumberOfEvents /> integration', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = mount(<App />);
  });

  test('renders NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

  test('default numberOfEvents prop', () => {
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(32);
  });

  test('changes the number of events', () => {
    const eventCount = 32;
    AppWrapper.find(NumberOfEvents).props().updateEvents(null, eventCount);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(
      eventCount
    );
  });

  afterAll(() => {
    AppWrapper.unmount();
  });
});
