import retailerDetails from '../retailerJson/retailerDetails.json';
import {useState} from 'react';
const AddContainer = ({cAddress,cUser,open,setOpen}:any) => {
   
    const [retProducts,setRetProducts] = useState({
        productName:'',
        quantity:1
    })
    const [retailerDet,setRetailerDet] = useState({...retailerDetails,products:retProducts})
    console.log(retailerDet);
    return(
        <div>
            {/* {
               retailerDet.map((retailer)=>{
                return(
                    <>
                        
                    </>
                )
               })  
            } */}
        </div>
    )
}

export default AddContainer;