//import mossbyteService from '../../services/mossbyte'

export const SET_SCHEDULE = 'SET_SCHEDULE'
export const TOGGLE_AUDIO = 'TOGGLE_AUDIO'

export function setSchedule(scheduleDetails) {
    return { type: SET_SCHEDULE, scheduleDetails }
}

export function toggleAudio() {
    return { type: TOGGLE_AUDIO }
}

/*
export function fetchSettings() {
    return async(dispatch, getState) => {
        try {
            const object = mossbyteService.select()
        } catch (error) {
            console.log(error)
        }
    }
}
*/
