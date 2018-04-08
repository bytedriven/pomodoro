import React from 'react';

export default class Modal extends React.Component {

    render() {
        return (
            <div className="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title"></p>
                        <button className="delete"></button>
                    </header>
                    <section className="modal-card-body"></section>
                    <footer className="modal-card-foot">
                        <button className="button is-success">Save Changes</button>
                        <button className="button">Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}
