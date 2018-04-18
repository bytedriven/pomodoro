import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormElement from './FormElement.jsx'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

export default class SettingsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: {...this.props.messages},
            breaks: [...this.props.breaks]
        }
    }
    
    handleOnSubmit = async (e) => {
        e.preventDefault()
        await this.setState({
            messages: {
                focus: document.getElementById('message.focus').value,
                break: document.getElementById('message.break').value,
            }
        })
        this.props.onSubmit({...this.state})
    }

    render() {
        return (
            <form onSubmit={e => this.handleOnSubmit(e)}>
                <section className="modal-card-body">
                    <FormElement 
                        displayName='Focus Message'
                        name='message.focus'
                        placeholder='Focus Message...'
                        defaultValue={this.props.messages.focus}
                    />
                    <FormElement 
                        displayName='Break Message'
                        name='message.break'
                        placeholder='Break Message...'
                        defaultValue={this.props.messages.break}
                    />
                    <div className="field" style={{overflow: 'hidden'}}>
                        <Range
                            id="range"
                            min={0} 
                            max={60} 
                            marks={({0: 0, 60:60})} 
                            defaultValue={this.props.breaks[0]}
                        />
                    </div>        
                </section>
                <footer className="modal-card-foot">
                  <button role="submit" className="button is-success">Save changes</button>
                  <a className="button" onClick={this.props.cancelOnClick}>Cancel</a>
                </footer>

            </form>
        )
    }
}
