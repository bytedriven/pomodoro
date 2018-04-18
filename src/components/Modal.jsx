import React from 'react'
import SettingsScreen from '../containers/SettingsScreen'

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
                <SettingsScreen cancelOnClick={this.props.cancelOnClick}/>                   
              </div>
            </div> 
        )
    }
}
