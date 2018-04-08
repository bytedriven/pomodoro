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
                break: [50, 60],
                exceptions: [
                    {
                        hour: 12,
                        break: [0, 60],
                        message: 'Lunch Break!'
                    }
                ],
            },
        };
    }

    componentDidMount() {
        this.timeID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    tick() {
        const startTime = moment().startOf('hour')
        const endTime = moment().startOf('hour').add(1, 'hour')
        const now = moment()
        let minutesDiff = endTime.diff(now, 'minutes')
        let secondsDiff = endTime.diff(now, 'seconds')
        let message
        let appClass

        let breakStart = this.state.schedule.break[0]
        let breakEnd = this.state.schedule.break[1]
        this.state.schedule.exceptions.forEach((e) => {
            if (parseInt(now.format('H')) === e.hour) {
                breakStart = e.break[0]
                breakEnd = e.break[1]
                message = e.message
            }
        })

        if ((now.format('m') >= breakStart && now.format('m') <= breakEnd)) {
            appClass = 'is-primary'
            message = message || 'Enagage with your co-workers!'
            minutesDiff = moment().startOf('hour').minute(breakEnd).diff(now, 'minutes') 
            secondsDiff = moment().startOf('hour').minute(breakEnd).diff(now, 'seconds') 

        } else {
            appClass = 'is-danger'
            message = message || 'Focus Time!'
            minutesDiff = moment().startOf('hour').minute(breakStart).diff(now, 'minutes') 
            secondsDiff = moment().startOf('hour').minute(breakStart).diff(now, 'seconds') 
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
                    <a className="navbar-item" href="/"><i className="fas fa-cog"></i></a>
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
