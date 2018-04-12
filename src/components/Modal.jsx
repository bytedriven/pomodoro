import React from 'react'
import FormElement from './FormElement.jsx'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

export default class Modal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalFunctions: this.props.modalFunctions
        }
    }

    outputClasses() {
        return this.props.show ?
        'modal is-active' :
        'modal'
    }
    
    render() {
        return (
           <div className={this.outputClasses()}>
              <div className="modal-background"></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">{this.props.title || 'Default Modal'}</p>
                  <button className="delete" aria-label="close" onClick={this.props.cancelOnClick}></button>
                </header>
                <section className="modal-card-body">
                    <FormElement 
                        displayName='Focus Message'
                        name='message.focus'
                        placeholder='Focus Message...'
                        value={this.props.message ? this.props.message.focus : 'message.focus'}
                    />
                    <FormElement 
                        displayName='Break Message'
                        name='message.break'
                        placeholder='Break Message...'
                        value={this.props.message ? this.props.message.break : 'message.break'}
                    />
                   <div className="field" style={{overflow: 'hidden'}}>
                    <Range 
                        min={0} 
                        max={60} 
                        marks={({0: 0, 60:60})} 
                        defaultValue={this.props.defaultRange}
                        onAfterChange={evt => this.state.modalFunctions.rangeOnChange(evt)}
                    />
                   </div>
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success">Save changes</button>
                  <button className="button" onClick={this.props.cancelOnClick}>Cancel</button>
                </footer>
              </div>
            </div> 
        )
    }
}
