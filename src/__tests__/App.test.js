import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import Event from '../Event';
import NumberOfEvents from '../NumberOfEvents';

describe('<App /> component', () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('renders list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('renders CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('renders Event component', () => {
    expect(AppWrapper.find(Event)).toHaveLength(1);
  });

  test('renders NumberOfEvents component', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});
