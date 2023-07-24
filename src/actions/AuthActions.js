import axios from 'axios'

const URL = 'http://localhost:5000'

export const signUp = (formData) => async (dispatch) => {

    dispatch({ type: 'AUTH_START' })

    try {

        const { data } = await axios.post(`${URL}/register`, formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })

    } catch (error) {
        dispatch({ type: 'AUTH_FAIL' })
    }

}

export const login = (formData) => async (dispatch) => {

    dispatch({ type: 'AUTH_START' })

    try {

        const { data } = await axios.post(`${URL}/login`, formData)
        dispatch({ type: 'AUTH_SUCCESS', data: data })

    } catch (error) {
        dispatch({ type: 'AUTH_FAIL' })
    }

}

export const logout = () => async (dispatch) => {
        dispatch({ type: 'SET_LOGOUT' })
}