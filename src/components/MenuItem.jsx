import React from 'react'

export default class MenuItem extends React.Component {
    

    render() {
        return (
            <a className="navbar-item" onClick={this.props.onClick}><i className={this.props.classes}></i></a>
        )
    }
}
