import React, { Component } from 'react';
import './App.css';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      textShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
      fontWeight: 'bold',
    };
  };

  render() {
    const { className, text } = this.props;
    return (
      <div className={`Alert ${className}`}>
        <p style={this.getStyle()}>{text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
  }

  render() {
    return <Alert className="InfoAlert" text={this.props.text} />;
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
  }

  render() {
    return <Alert className="ErrorAlert" text={this.props.text} />;
  }
}

export { ErrorAlert };
export { InfoAlert };
