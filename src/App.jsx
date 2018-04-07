import React from 'react';
import Clock from './Clock.jsx';
import Message from './Message.jsx';
import moment from 'moment';
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focusTime: false,
            message: 'Loading...',
            appClass: 'is-dark'
        };
        this.tick()
    }

    componentDidMount() {
        this.timeID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        const startTime = moment().startOf('hour')
        const endTime = moment().startOf('hour').add('hour', 1)
        const now = moment()
        const minutesDiff = endTime.diff(now, 'minutes')
        const secondsDiff = endTime.diff(now, 'seconds')
        let message
        let appClass
        if (minutesDiff < 10) {
            appClass = 'is-primary'
            message = 'Enagage with your co-workers!'
        } else {
            appClass = 'is-danger'
            message = 'Focus Time!'
        }
        this.setState({
            start: startTime,
            end: endTime,
            diff: `${minutesDiff.toLocaleString('en-au', {minimumIntegerDigits: 2})}:${(secondsDiff%60).toLocaleString('en-au', {minimumIntegerDigits: 2})}`,
            message: message,
            appClass: appClass,
        })
    }

    outputClasses() {
        return `hero ${this.state.appClass} is-bold is-fullheight`
    }

    render() {
        return (
            <section className={this.outputClasses()}>
                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title is-size-1">{this.state.diff}</h1>
                        <Message message={this.state.message} />
                        <Clock />
                    </div>
                </div>
            </section>
        )
    }
}
