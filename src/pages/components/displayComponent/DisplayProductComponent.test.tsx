import React from "react";
import { screen,render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from '../../../redux/store';
import HeaderComponent from "../header/HeaderComponent";
import DisplayProductComponent from './DisplayProductComponent'

test("check Retailer Details",()=>{
    render(
        <Provider store = {store}>
            <DisplayProductComponent/>
        </Provider>
    );

    store.getState().retailers.retailers.forEach((retailer)=>{
        const retailerName = screen.getByText(`NAME : ${retailer.name}`);
        expect(retailerName).toBeInTheDocument();

    })
})

test("Check Retailer Products",()=>{
    render(
        <Provider store = {store}>
            <DisplayProductComponent />
        </Provider>
    );

    store.getState().retailers.retailers.forEach((retailer)=>{
        retailer.products.forEach((product)=>{
            const retailerProduct = screen.getByText(product.productName);
            expect(retailerProduct).toBeInTheDocument();
        })
    })
})