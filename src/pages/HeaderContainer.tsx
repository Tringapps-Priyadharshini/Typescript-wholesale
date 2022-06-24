import './headerContainer.css';
import { useState } from 'react';
import { Backdrop, Container } from '@mui/material';
import AddProduct from '../addContainer/AddProduct';
const HeaderContainer = () =>{
    const [retailerDetails,setRetailerDetails] = useState({
        name:'',
        address:'Madurai',
        products:[]
    })
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(true);
    };
    const handleBackdrop = () => {
        setOpen(!open);
    }
    return(
        <div className = "head">
            <h1>Fancy Products</h1>
            <div className='retailers'>
            <button type = "submit" onClick = {handleBackdrop}>Retailer1</button>
            <button type = "submit">Retailer2</button>
            <button type = "submit">Retailer3</button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >

                <Container className = "addProduct">
                    <AddProduct />
                </Container>
            </Backdrop>
            </div>
        </div>
    )
}

export default HeaderContainer;