import React from "react";
import { screen,render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from '../../../redux/store';
import HeaderComponent from "../header/HeaderComponent";

test("checkRetailerName",()=>{
    render(
        <Provider store = {store}>
            <HeaderComponent/>
        </Provider>
    );

    store.getState().retailers.retailers.forEach((retailer)=>{
        const retailerName = screen.getByText(retailer.name);
        expect(retailerName).toBeInTheDocument();
        fireEvent.click(retailerName)
    })
})