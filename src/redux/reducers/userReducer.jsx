import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/configure';

const initialState = {
    infoUser: {}
}

const userReducer = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        setGetUserProfileAsyncAction: (state, action) => {
            state.infoUser = action.payload
        },
        setUpdateUserProfileAsyncAction: (state, action) => {
            state.infoUser = { ...state.infoUser, ...action.payload };
        }
    }
});

export const { setGetUserProfileAsyncAction, setUpdateUserProfileAsyncAction } = userReducer.actions

export default userReducer.reducer

export const getUserProfileAsync = () => {
    return async (dispatch) => {
        try {
            // Fetch user profile from API
            const res = await http.post("Users/getProfile");
            const action = setGetUserProfileAsyncAction(res.data.content);
            dispatch(action);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    }
}

export const updateUserProfileAsync = (updatedProfile) => {
    return async (dispatch) => {
        try {
            const res = await http.post("Users/updateProfile", updatedProfile);
            console.log(res.data.content);
            const action = setUpdateUserProfileAsyncAction(updatedProfile);
            dispatch(action);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };
};