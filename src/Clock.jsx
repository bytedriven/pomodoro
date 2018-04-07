import React from 'react';
export default class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    tick() {
        this.setState({
            date: new Date()
        })
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }
    
    render() {
        return (
            <h3 className="is-size-4">{this.state.date.toLocaleString('en-au', {
                hour: 'numeric', 
                minute: 'numeric',
                hour12: true,
            })}</h3>
        )
    }
}
