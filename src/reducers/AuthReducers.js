const initalState = { authData: [], loading: false, error: false, updatingLoading: false }

const authReducer = (state = initalState, action) => {

    switch (action.type) {

        case 'AUTH_START':
            return { ...state, loading: true }


        case 'AUTH_SUCCESS':

            localStorage.setItem('profile', JSON.stringify(action?.data))

            return { ...state, loading: false, authData: action.data }


        case 'AUTH_FAIL':
            return { ...state, loading: false, error: true }


        case 'SET_LOGOUT':

            localStorage.clear()

            return { ...state, authData: [], loading: false, error: false }


        case 'UPDATING_START':
            return { ...state, updatingLoading: true, error: false }


        case 'UPDATING_SUCCESS':

            localStorage.setItem('profile', JSON.stringify(action?.data))

            return { ...state, authData: action.data, updatingLoading: false, error: false }


        case 'UPDATING_FAIL':
            return { ...state, loading: false, updatingLoading: false, error: true }


        default:
            return state;
    }

}


export default authReducer;