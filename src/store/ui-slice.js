import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        notification: null
    },
    reducers: {
        showNotification(state, action){
            console.log("deberia aparecer el notif!!");
            state.notification = {
                message: action.payload.message,
                type: action.payload.type,
                open: action.payload.open
            }
        }
    }
});

export const uiActions = uiSlice.actions;
export default uiSlice;