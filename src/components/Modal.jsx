import React from 'react'
import FormElement from './FormElement.jsx'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

export default class Modal extends React.Component {

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
                        name="settings.break.start"
                        displayName="Break start time"
                        placeholder="0 - 60"
                        type="number"
                    />
                    <FormElement 
                        name="settings.break.end"
                        displayName="Break end time"
                        placeholder="0 - 60"
                        type="number"
                    />
                   <div className="field">
                    <Range 
                        min={0} 
                        max={60} 
                        marks={({0: 0, 60:60})} 
                        defaultValue={this.props.defaultRange}
                        onAfterChange={this.props.rangeOnChange}
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
