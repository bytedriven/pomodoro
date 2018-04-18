import {
    ADD_EXCEPTION,
    REMOVE_EXCEPTION,
} from './actions'

const initialState = [
    {
        'hour': 12,
        'break': [0,60],
        'message': 'Lunch Time!'
    },
]

export default function exceptionReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EXCEPTION:
            return [
                ...state,
                {
                    'hour': action.data.hour,
                    'break': action.data.break,
                    'message': action.data.message,
                }
            ]
        case REMOVE_EXCEPTION:
            return state.map((exception, index) => {
                if (index !== action.index) {
                    return exception
                }
            })
        default:
            return state
    } 
}


