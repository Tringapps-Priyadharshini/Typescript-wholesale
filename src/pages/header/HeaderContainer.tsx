import './headerContainer.css';
import { useState } from 'react';
import { Container,Backdrop } from '@mui/material';
// import { useSelector } from 'react-redux';
import {useAppSelector } from '../../redux/hooks';
import AddProductContainer from '../addProduct/AddProductContainer';
const HeaderContainer = () => {
    const retailerDetails = useAppSelector(state => state.retailers.retailers)
    const [cUser,setUser] = useState<string>('')

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
                    retailerDetails.map((retailer) => {
                        return (
                            <>

                                <button type="submit" onClick={()=>{handleOverlap(retailer.name)}}>{retailer.name}</button>

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
                        <AddProductContainer cUser = {cUser} />
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
                                

                               
                                
                               {/* {retailerDetail.products.map((product)=>{
                                return(
                                    <div>                                    
                                    {product.productName &&
                                    
                                    <div className='products'>
                                        <label className = "items">name:{product.productName}</label>
                                        <label className = "items">quantity:{product.quantity}</label>
                                    </div>

                                    }
                                     </div>
                                )
                               
                               })} */}
                             
                            </div>
                        )
                    })
                }
            </div>


        
        </>
    )
}

export default HeaderContainer;
