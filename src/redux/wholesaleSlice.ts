import { createSlice } from "@reduxjs/toolkit";
import wholesaleDetails from '../wholesaleJson/wholesaleDetails.json'

const wholesaleSlice = createSlice({
    name:'wholesale',
    initialState: wholesaleDetails,
    reducers:{
        
    }
})

export default wholesaleSlice.reducer;