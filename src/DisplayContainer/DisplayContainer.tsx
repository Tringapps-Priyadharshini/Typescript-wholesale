import HeaderContainer from '../pages/HeaderContainer';
import { useState,useEffect } from 'react';
const DisplayContainer = () => {
    const [displayDetails,setDisplayDetails] = useState([])
    useEffect(()=>{
        console.log("asdf" ,localStorage.getItem(JSON.parse('buy')));
    },[])
    return (
        <div className="display">
            <HeaderContainer/>
            {
                displayDetails.map((displayRetailer:any) => {
                    return (
                        <div className="displayRetailerDetails">
                            asdfadsfadsf
                            {displayRetailer.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayContainer;