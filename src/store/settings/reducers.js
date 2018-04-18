import {
    SET_SCHEDULE,
    TOGGLE_AUDIO,

} from './actions'

const initialState = {
    breaks: [
        [50, 60],
    ],
    messages: {
        break: 'Break Time',
        focus: 'Focus Time'
    },
    audioOn: true,
}

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SCHEDULE:
            console.log(action)
            return {
                ...state,
                breaks: action.scheduleDetails.breaks,
                messages: action.scheduleDetails.messages,
            }
        case TOGGLE_AUDIO:
            return {
                ...state,
                audioOn: !state.audioOn
            }
        default:
            return state
    }
}
