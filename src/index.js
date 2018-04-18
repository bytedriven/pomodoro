import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import 'bulma/css/bulma.css'
import AppContainer from './containers/AppContainer.jsx'
import fontawesome from '@fortawesome/fontawesome'
import fasCog from '@fortawesome/fontawesome-free-solid/faCog'
import rootReducer from './store/reducers'

fontawesome.library.add(fasCog)

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route exact path='/' component={AppContainer} />
                <Route path='/:key' component={AppContainer} />
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'))
