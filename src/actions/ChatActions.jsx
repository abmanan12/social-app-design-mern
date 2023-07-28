import axios from "axios";

const URL = 'http://localhost:5000'


// Frontend search function and API call
export const searchUsers = query => async (dispatch) => {
    try {

        const { data } = await axios.get(`${URL}/searchUsers/${query}`);
        return data;

    } catch (error) {
        console.log(error);
    }
};


// get chat users
export const getUsers = userId => async (dispatch) => {
    try {

        const { data } = await axios.get(`${URL}/chat/${userId}`)
        return data

    } catch (error) {
        console.log(error);
    }

}


// get chat users
export const createChat = (senderId, receiverId) => async (dispatch) => {

    try {

        const { data } = await axios.post(`${URL}/chat`, { senderId, receiverId })
        return data

    } catch (error) {
        console.log(error);
    }

}


// get messages
export const getMessages = chatId => async (dispatch) => {
    try {

        const { data } = await axios.get(`${URL}/getMessage/${chatId}`)
        return data

    } catch (error) {
        console.log(error);
    }

}

// send message
export const addMessage = message => async (dispatch) => {
    try {

        const { data } = await axios.post(`${URL}/addMessage`, message);
        return data

    } catch (error) {
        console.log(error);
    }

}