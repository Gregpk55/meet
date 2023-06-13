import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfEvents: 32,
      showError: false,
    };
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    if (value <= 0 || value > 50) {
      this.setState({
        numberOfEvents: value,
        showError: true,
      });
    } else {
      this.setState({
        numberOfEvents: value,
        showError: false,
      });
      this.props.updateEvents(null, value);
    }
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <label>Number of Events:</label>
        <input
          type="number"
          className="number-input"
          value={this.state.numberOfEvents}
          onChange={this.handleInputChange}
        />
        {this.state.showError && <ErrorAlert text="Invalid number of events" />}
      </div>
    );
  }
}

export default NumberOfEvents;
