import React from 'react'
import Clock from './Clock.jsx'
import MenuItem from './MenuItem.jsx'
import Modal from './Modal.jsx'
import Message from './Message.jsx'
import moment from 'moment'
//import Mossbyte from '../mossbyte.js'
import config from '../config.js'
import audioBreak from '../assets/break.wav'
import audioFocus from '../assets/focus.wav'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSettings: false,
            focusTime: false,
            message: 'Loading...',
            appClass: 'is-dark',
            mossByte: {
               object: {
                   break: [50, 60],
                   messages: {
                       focus: 'Focus Time!',
                       break: 'Engage with your co-workers!',
                   },
                    exceptions: [
                        {
                            hour: 12,
                            break: [0, 60],
                            message: 'Lunch Break!'
                        }
                    ],
               } 
            },
            sounds: {
                focus: new Audio(audioFocus),
                break: new Audio(audioBreak),
            },
        }
        this.roomKey = this.props.match.params.key
        //this.mossbyte = new Mossbyte(this.roomKey, config.keys.app.public)

    }

    componentDidMount() {
        this.timeID = setInterval(() => this.tick(), 1000)
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

        let breakStart = this.props.settings.breaks[0][0]
        let breakEnd = this.props.settings.breaks[0][1]
        this.props.exceptions.forEach((e) => {
            if (parseInt(now.format('H'), 10) === e.hour) {
                breakStart = e.break[0]
                breakEnd = e.break[1]
                message = e.message
            }
        })

        if ((now.format('m') >= breakStart && now.format('m') <= breakEnd)) {
            if (this.state.appClass !== 'is-primary' && this.state.appClass !== 'is-dark') {
                this.state.sounds.break.play()
            }
            appClass = 'is-primary'
            message = message || this.props.settings.messages.break
            minutesDiff = moment().startOf('hour').minute(breakEnd).diff(now, 'minutes') 
            secondsDiff = moment().startOf('hour').minute(breakEnd).diff(now, 'seconds') 

        } else {
            if (this.state.appClass !== 'is-danger' && this.state.appClass !== 'is-dark') {
                this.state.sounds.focus.play()
            }
            appClass = 'is-danger'
            message = message || this.props.settings.messages.focus
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
        return `hero ${this.state.appClass} is-fullheight`
    }

    settingsClickHandler() {
        this.setState({ showSettings: !this.state.showSettings })
    }

    render() {
        return (
            <section className={this.outputClasses()}>
                <nav className="navbar">
                    <MenuItem classes="fas fa-cog" onClick={() => this.settingsClickHandler()}/>
                </nav>

                <div className="hero-body has-text-centered">
                    <div className="container">
                        <h1 className="title is-size-1">{this.state.diff}</h1>
                        <Message message={this.state.message} />
                        <Clock />
                    </div>
                </div>
                <Modal 
                    show={this.state.showSettings}
                    title='Settings'
                    cancelOnClick={() => this.settingsClickHandler()}
                />
            </section>
        )
    }
}
