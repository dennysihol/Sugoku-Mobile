const initialState = {
    data: []
}

export default function reducer (state = initialState, { type, payload }) {
    switch (type) {

    case 'board/fetch':
        return { ...state, data: payload }

    default:
        return state
    }
}
