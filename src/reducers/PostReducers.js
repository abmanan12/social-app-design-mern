const initialState = { posts: [], uploading: false, error: false, loading: false }

const postReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'UPLOAD_START':
            return { ...state, uploading: true };

        case 'UPLOAD_SUCCESS':
            return { ...state, uploading: false, posts: [...state.posts, action.data] };

        case 'UPLOAD_FAIL':
            return { ...state, uploading: false, error: true };

        case 'RETREIVING_START':
            return { ...state, loading: true, error: false }

        case 'RETREIVING_SUCCESS':
            return { ...state, posts: action.data, loading: false, error: false }

        case 'RETREIVING_FAIL':
            return { ...state, loading: false, error: true }

        default:
            return state;
    }

}


export default postReducer;