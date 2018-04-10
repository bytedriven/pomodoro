import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'
import App from './App.jsx'
import fontawesome from '@fortawesome/fontawesome'
import fasCog from '@fortawesome/fontawesome-free-solid/faCog'

fontawesome.library.add(fasCog)

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/:key' component={App} />
        </Switch>
    </HashRouter>
), document.getElementById('root'))
