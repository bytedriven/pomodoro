import { connect } from 'react-redux'
import App from '../components/App.jsx'

const mapStateToProps = (state, ownProps) => {
    return {
        settings: state.settings,
        exceptions: state.exceptions,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)


export default AppContainer
