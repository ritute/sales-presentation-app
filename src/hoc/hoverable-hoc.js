import React, { Component } from 'react';

export const withHover = (WrappedComponent, propName = 'isHovered') => (
  class extends Component {
    state = {
      isHovered: false
    };

    onMouseEnter = () => {
      this.setState({ isHovered: true });
    };

    onMouseLeave = () => {
      this.setState({ isHovered: false });
    };

    render() {
      const props = { [propName]: this.state.isHovered, ...this.props }
      return (
        <div
          onMouseEnter={() => this.onMouseEnter()}
          onMouseLeave={() => this.onMouseLeave()}
        >
          <WrappedComponent { ...props } />
        </div>
      )
    }
  }
);
