import axios from "axios";

const URL = 'http://localhost:5000'

export const uploadImage = (data) => async (dispatch) => {
    try {
        await axios.post(`${URL}/uploadimage`, data)
    }
    catch (error) {
        console.log(error);
    }
}


export const uploadPost = (post) => async (dispatch) => {

    dispatch({ type: "UPLOAD_START" });

    try {
        const { data } = await axios.post(`${URL}/post`, post)
        dispatch({ type: "UPLOAD_SUCCESS", data: data });
    }
    catch (error) {
        console.log(error);
        dispatch({ type: "UPLOAD_FAIL" });
    }
}