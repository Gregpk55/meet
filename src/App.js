import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import Event from './Event';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    isOffline: false,
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events,
            locations: extractLocations(events),
          });
        }
      });
    }

    window.addEventListener('offline', this.handleConnectionChange);
    window.addEventListener('online', this.handleConnectionChange);
  }

  componentWillUnmount() {
    this.mounted = false;

    window.removeEventListener('offline', this.handleConnectionChange);
    window.removeEventListener('online', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const isOffline = !navigator.onLine;
    this.setState({ isOffline });
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
    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App" />;
    }

    const { isOffline, showWelcomeScreen } = this.state;

    if (showWelcomeScreen) {
      return (
        <div className="App">
          <WelcomeScreen
            showWelcomeScreen={showWelcomeScreen}
            getAccessToken={getAccessToken}
          />
        </div>
      );
    }

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
