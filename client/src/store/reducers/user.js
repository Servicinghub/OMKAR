// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState ={user: {
    name:'',
    _id:'',
    profilePicture:'',
    token:'',
    tfa:''
}};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        update(state, action) {
            console.log(action);
            state.user = action.payload;
        },
        remove(state) {
        state.user= initialState;
        },
    }
});

export default user.reducer;

export const { update, remove } = user.actions;
