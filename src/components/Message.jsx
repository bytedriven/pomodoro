import React from 'react';

export default class Message extends React.Component {
    render() {
        return (
            <h2 className="subtitle is-size-3">{this.props.message}</h2>
        );
    }
}
