import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const name = 'checkImg';

type stateType = {
    status : Boolean
}

const initialState : stateType = {
    status : false
}

export const checkImgStatus = createSlice({
    name,
    initialState,
    reducers: {
        setStatus(state, action : PayloadAction<Boolean>) {
            state.status = action.payload
            console.log('<img> state.status : ',  state.status)
        },
    },

});

export const { setStatus } = checkImgStatus.actions;

export default checkImgStatus.reducer;