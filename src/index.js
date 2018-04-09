import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'
import App from './App.jsx'

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/:key' component={App} />
        </Switch>
    </HashRouter>
), document.getElementById('root'))
