import { connect } from 'react-redux'
import SettingsForm from '../components/SettingsForm.jsx'
import { setSchedule } from '../store/settings/actions'

function mapStateToProps(state, ownProps) {
    return {
        breaks: state.settings.breaks,
        messages: state.settings.messages,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: (scheduleDetails) => {
            dispatch(setSchedule(scheduleDetails))
        }
    }
}

const SettingsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsForm)

export default SettingsScreen
