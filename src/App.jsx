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
            appClass: 'is-dark',
            schedule: {
                break: [50, 59],
                exceptions: [
                    {
                        hour: 12,
                        break: [0, 59]
                    },
                ],
            },
        };
        this.tick()
    }

    componentDidMount() {
        this.timeID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    onBreak(now) {
        let breakStart = this.state.schedule.break[0]
        let breakEnd = this.state.schedule.break[1]
        this.state.schedule.exceptions.forEach((e) => {
            if (now.format('h') == e.hour) {
                breakStart = e.break[0]
                breakEnd = e.break[1]
            }
        })

        return (now.format('m') >= breakStart && now.format('m') <= breakEnd) ? true : false
    }

    tick() {
        const startTime = moment().startOf('hour')
        const endTime = moment().startOf('hour').add('hour', 1)
        const now = moment()
        const minutesDiff = endTime.diff(now, 'minutes')
        const secondsDiff = endTime.diff(now, 'seconds')
        let message
        let appClass

        if (this.onBreak(now)) {
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
                <nav className="navbar">
                    <a className="navbar-item" href=""><i className="fas fa-cog"></i></a>
                </nav>

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
