import React from 'react';
import FormElement from './components/FormElement.jsx'

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
                    name="settings.test"
                    displayName="Settings Test"
                    placeholder="Yeah, so, like... This doesn't do anything yet"
                />

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
