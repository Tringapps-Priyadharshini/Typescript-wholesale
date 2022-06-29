import { createSlice } from "@reduxjs/toolkit";
import retailerDetails from '../retailerJson/retailer.json';

type productType = {
    id: string,
    productName: string,
    quantity: number
}

type retailerType = {
    retailers: {
        name: string,
        address: string,
        products: productType[]
    }[]
}

const initialState : retailerType = {
    retailers : localStorage['retailerDetails'] ? JSON.parse(localStorage['retailerDetails']) : retailerDetails 
}

if(!localStorage['retailerDetails']){
    localStorage['retailerDetails'] = JSON.stringify(retailerDetails)
}

const retailerSlice = createSlice({
    name: 'retailers',
    initialState,
    reducers: {

    }


})

export default retailerSlice.reducer;