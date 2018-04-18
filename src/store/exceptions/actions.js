export const ADD_EXCEPTION = 'ADD_EXCEPTION'
export const REMOVE_EXCEPTION = 'REMOVE_EXCEPTION'

export function addException(data) {
    return { type: ADD_EXCEPTION, data }
}

export function removeException(index) {
    return { type: REMOVE_EXCEPTION, index }
}


