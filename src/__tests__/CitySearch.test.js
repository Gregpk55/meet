// src/__tests__/CitySearch.test.js

import React from 'react';
import { shallow, mount } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
  let locations, CitySearchWrapper;
  beforeAll(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />
    );
  });

  test('reder text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });
  test('reder text suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });
  test('change state when text input changes', () => {
    CitySearchWrapper.setState({
      query: 'Munich',
    });
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('render list of suggestions correctly', () => {
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length + 1
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        suggestions[i]
      );
    }
  });

  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    const query = CitySearchWrapper.state('query');
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
  });

  test('selecting a suggestion should change query state', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
    });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
  });

  test('renders input field with initial state', () => {
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(
      'Berlin, Germany'
    );
  });

  test('renders suggestions based on user input', () => {
    CitySearchWrapper.find('.city').simulate('change', {
      target: { value: 'Berlin' },
    });
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
  });

  test('updates query state on user input', () => {
    const eventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });

  test('selecting CitySearch input reveals the suggestions list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({
      display: 'none',
    });
  });

  test('selecting a suggestion should hide the suggestions list', () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined,
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({
      display: 'none',
    });
  });

  test('resets state to default when clicking outside the search bar or search results', () => {
    const CitySearchWrapper = mount(<CitySearch />);

    CitySearchWrapper.setState({
      query: 'London',
      suggestions: ['London', 'New York'],
      showSuggestions: true,
    });

    const event = new MouseEvent('click');
    document.dispatchEvent(event);

    expect(CitySearchWrapper.state('query')).toBe('');
    expect(CitySearchWrapper.state('suggestions')).toEqual([]);
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);

    CitySearchWrapper.unmount();
  });
});
