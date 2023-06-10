import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      let filteredEvents = events;
      if (location && location !== 'all') {
        filteredEvents = events.filter((event) => event.location === location);
      }
      if (eventCount) {
        filteredEvents = filteredEvents.slice(0, eventCount);

        this.setState({ numberOfEvents: eventCount });
      }
      this.setState({
        events: filteredEvents,
      });
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1>Meet App</h1>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents}
          />
        </div>
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        <EventList events={this.state.events} />
        <Event />
      </div>
    );
  }
}

export default App;
