import HeaderContainer from '../pages/HeaderContainer';
import { useState} from 'react';
const DisplayContainer = ({retailerDetails}:any) => {
    console.log("hi")
    return (
        <div className="display">
            {
                retailerDetails.map((details:any) => {
                    return(
                        <div>
                           <p>{details.name}</p>
                            <p>{details.address}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DisplayContainer;