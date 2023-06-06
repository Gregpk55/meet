import React, { Component } from 'react';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  handleDetailsToggle = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;

    if (!event) {
      return null;
    }

    return (
      <div>
        <h2>{event.summary}</h2>
        <p>{new Date(event.start.dateTime).toString()}</p>
        <p>{`@${event.summary} | ${event.location}`}</p>
        {!collapsed && (
          <div>
            <h3>About event:</h3>
            <a href={event.htmlLink}>See details on Google Calendar</a>
            <p>{event.description}</p>
          </div>
        )}
        <button onClick={this.handleDetailsToggle}>
          {collapsed ? 'show' : 'hide'} details
        </button>
      </div>
    );
  }
}

export default Event;
