import './headerComponent.css';
import { useState } from 'react';
import { Container,Backdrop } from '@mui/material';
import {useAppSelector } from '../../../redux/hooks';
import AddProductComponent from '../addProductComponent/AddProductComponent';
import DisplayProduct from '../displayComponent/DisplayProduct';
const HeaderContainer = () => {
    const retailerDetails = useAppSelector(state => state.retailers.retailers)
    const [cUser,setUser] = useState<string>('')
    const [open, setOpen] = useState(false);

    const handleOverlap = (cname:string) => {
        setOpen(!open);
        setUser(cname)
    }
    return (
        <div>
        <div className="header">
            <span>Shopping Mart</span>
                {
                    retailerDetails.map((retailer) => {
                        return (
                            <div className = "retailers">

                                <button type="submit" className = "retailName" onClick={()=>{handleOverlap(retailer.name)}}>{retailer.name}</button>

                            </div>
                        )
                    })
                }

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                   
                > 
                 <div>
                   { 
                   open && <Container sx = {{maxWidth : "200px"}}>
                        <AddProductComponent cUser = {cUser} setOpen = {setOpen} open = {open}/>
                    </Container>
                    }
                </div>
                
                </Backdrop> 
                
          
            
        </div>
        <DisplayProduct />


        
        </div>
    )
}

export default HeaderContainer;
