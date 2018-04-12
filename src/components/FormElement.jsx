import React from 'react'

export default class FormElement extends React.Component {

    render() {
        return(
        <div className="field">
          <label className="label">{this.props.displayName || this.props.name || 'Unamed Input'}</label>
          <div className="control">
            <input 
                className="input" 
                type={this.props.type || 'text'} 
                id={this.props.name} 
                name={this.props.name} 
                placeholder={this.props.placeholder} 
                value={this.props.value}    
            />
          </div>
        </div>
        )
    }
}
