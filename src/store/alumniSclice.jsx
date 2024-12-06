// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     user: null,
// }

// export const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         setUserDetails: (state, action) => {
//             state.user = action.payload
//         },
//     },
// })

// export const { setUserDetails } = userSlice.actions

// export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    alumni: null,
};

export const alumniSlice = createSlice({
    name: 'alumni',
    initialState,
    reducers: {
        setAlumniDetails: (state, action) => {
            state.alumni = action.payload;
        },
    },
});

export const { setAlumniDetails } = alumniSlice.actions;

export default alumniSlice.reducer;
