import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false,
    };
  }

  handleDetailsToggle = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    const { event, numberOfEvents } = this.props;
    const { showDetails } = this.state;

    return (
      <div>
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <button
          className="details-button"
          onClick={this.handleDetailsToggle}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <div className="event-details">
            <p>{event.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
