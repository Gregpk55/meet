
import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined,
    infoText: '',
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.searchInputRef &&
      !this.searchInputRef.contains(event.target) &&
      this.state.showSuggestions
    ) {
      this.setState({
        showSuggestions: false,
        infoText: '',
      });
    }
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({ showSuggestions: true });
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    suggestions.sort((a, b) => a.localeCompare(b));
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText:
          'We can not find the city you are looking for. Please try another city',
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText: '',
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
    });

    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch" ref={(ref) => (this.searchInputRef = ref)}>
        <InfoAlert text={this.state.infoText} />
        <input
          type="text"
          className="city"
          value={this.state.query}
          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
        />
        <ul
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none' }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li onClick={() => this.handleItemClicked('all')}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
