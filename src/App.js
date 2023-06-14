import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    isOffline: false,
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    window.addEventListener('offline', this.handleOffline);
    window.addEventListener('online', this.handleOnline);
  }

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener('offline', this.handleOffline);
    window.removeEventListener('online', this.handleOnline);
  }

  handleOffline = () => {
    this.setState({ isOffline: true });
  };

  handleOnline = () => {
    this.setState({ isOffline: false });
  };

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
    const { isOffline } = this.state;

    return (
      <div className="App">
        {isOffline && <WarningAlert text="You are currently offline" />}
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
