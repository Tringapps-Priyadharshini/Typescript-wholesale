import './headerContainer.css';
import { useState } from 'react';
import { Container,Backdrop } from '@mui/material';
import AddContainer from '../addContainer/AddContainer';
import retailer from '../retailerJson/retailers.json';
import { useAppSelector } from '../redux/hooks';
const HeaderContainer = () => {
    // const [retailerDetails,setRetailerDetails] = useState<retailerType>(retailer);
    const [retailerDetails, setRetailerDetails] = useState(retailer);
    const [cUser,setUser] = useState('')

    const [open, setOpen] = useState(false);
    const handleClose = () => {
    //   //  setOpen(false);
    };
    const handleOverlap = (cname:string) => {
        setOpen(!open);
        setUser(cname)
    }
    return (
        <>
        <div className="head">
            <h1>Products</h1>
            <div className='retailers'>
                {
                    retailerDetails.map((retailers) => {
                        return (
                            <>

                                <button type="submit" onClick={()=>{handleOverlap(retailers.name)}}>{retailers.name}</button>

                            </>
                        )
                    })
                }

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                > 
                 <div className = "overlap">
                   { 
                   open && <Container className="overlap addProduct">
                        <AddContainer cUser = {cUser}  open = {open} setOpen = {setOpen} />
                    </Container>
                    }
            </div>
                
                </Backdrop> 
                

            </div>
          
            
        </div>
        <div className = "retDetail">
                {
                    retailerDetails.map((retailerDetail)=>{
                        return(
                            <div className = "retailerDisplay">
                               <p> NAME : {retailerDetail.name} </p>
                               <p> ADDRESS : {retailerDetail.address} </p>
                                

                               
                                
                               {retailerDetail.products.map((product)=>{
                                return(
                                    <div>                                    
                                    
                                    <div className='products'>
                                        <label className = "items">name:{product.productName}</label>
                                        <label className = "items">quantity:{product.quantity}</label>
                                    </div>

                                     </div>
                                )
                               
                               })}
                             
                            </div>
                        )
                    })
                }
            </div>


        
        </>
    )
}

export default HeaderContainer;
