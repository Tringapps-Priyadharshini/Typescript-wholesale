import { createSlice } from "@reduxjs/toolkit";
import wholesaleDetails from '../wholesaleJson/wholesaleDetails.json'
import { addProduct } from "./retailerSlice";
import { wholesale } from "../interface/WholesaleInterface";


const initialState : wholesale = {
    products: localStorage['wholesale'] ? JSON.parse(localStorage['wholesale']) : wholesaleDetails
}

if(!localStorage['wholesale']){
    localStorage['wholesale'] = JSON.stringify(wholesaleDetails)
}

const wholesaleSlice = createSlice({
    name:'wholesale',
    initialState,
    extraReducers : (builder) => {
        builder.addCase(addProduct,(state,action)=>{
            console.log('whole',action.payload)
            const newProducts = action.payload.products;
            const wholesaleProducts = [...state.products]
            newProducts.forEach((product:any)=>{
                wholesaleProducts.find((wholesaleProduct)=>wholesaleProduct.productName === product.productName)!.quantity -= product.quantity
            })
            localStorage['wholesale'] = JSON.stringify(wholesaleProducts)

        })
    },
    reducers:{
        
    }
})

export default wholesaleSlice.reducer;