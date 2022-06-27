import './headerContainer.css';
import { useState } from 'react';
import { Container } from '@mui/material';
// import AddProduct from '../addContainer/AddProduct';
import AddContainer from '../addContainer/AddContainer';
import retailer from '../retailerJson/retailer.json';
import { retailerType } from '../interface/retailerType';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
const HeaderContainer = () => {
    // const [retailerDetails,setRetailerDetails] = useState<retailerType>(retailer);
    const [retailerDetails, setRetailerDetails] = useState(retailer);
    const [cAddress,setAddress] = useState('');
    const [cUser,setUser] = useState('')

    const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //   //  setOpen(false);
    // };
    const handleOverlap = (cAddress:string,cname:string) => {
        console.log("cuser",cAddress)
        setOpen(!open);
        setAddress(cAddress)
        setUser(cname)
    }
    return (
        <>
        <div className="head">
            <h1>Fancy Products</h1>
            <div className='retailers'>
                {
                    retailerDetails.map((retailers) => {
                        return (
                            <>

                                <button type="submit" onClick={()=>{handleOverlap(retailers.address,retailers.name)}}>{retailers.name}</button>

                            </>
                        )
                    })
                }
{/* 
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    onClick={handleClose}
                > */}
                
                {/* </Backdrop> */}
                

            </div>
          
            <div className = "overlap">
                   { 
                   open && <Container className="overlap addProduct">
                        {/* <AddProduct cAddress = {cAddress} cUser = {cUser}  open = {open} setOpen = {setOpen} /> */}
                        <AddContainer cAddress = {cAddress} cUser = {cUser}  open = {open} setOpen = {setOpen} />

                    </Container>
                    }
            </div>
            {/* <DisplayContainer/> */}
            
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
                                    <>                                    
                                    {product.productName ? <table>
                                    <tr>
                                        <td>ProductName</td>
                                        <td>Quantity</td>
                                    </tr>
                                    <tr>
                                        <td>{product.productName}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                </table>:
                                <p>No Product are purchased</p>
                                }
                                </>

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
