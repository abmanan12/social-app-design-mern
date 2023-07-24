import axios from "axios";

const URL = 'http://localhost:5000'

export const getTimelinePosts = (id) => async (dispatch) => {

    dispatch({ type: "RETREIVING_START" });

    try {
        const { data } = await axios.get(`${URL}/${id}/timeline`)
        dispatch({ type: "RETREIVING_SUCCESS", data: data });
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "RETREIVING_FAIL" });
    }
}

export const likePost = (id, userId) => async (dispatch) => {

    try {
        await axios.put(`${URL}/${id}/like`, { userId: userId })
    }
    catch (error) {
        console.log(error);
    }
}