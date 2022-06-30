import './Header.css';
import { Backdrop } from '@mui/material';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

const Header = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleToggle = () => {
        setOpen(!open)
    }
    return (
        <div>
            <div className="header">
                <span>SHOPPING MART</span>
                <div className="retailers">
                    <button onClick={handleToggle} className="retailName">Pinky Fashion</button>
                    <button className="retailName">Trendy clothes</button>
                    <button className="retailName">Stylish Collections</button>
                </div>
            </div>
            <div className="displayDetails">
                <div className="retailerDetails">
                    <span>Name &nbsp;&nbsp;&nbsp;&nbsp;: Pinky Fashion</span>
                    <span>Address &nbsp;: Madurai</span>
                </div>
                <div className="retailerDetails">
                    <span>Name &nbsp;&nbsp;&nbsp;&nbsp;: Trendy Clothes</span>
                    <span>Address &nbsp;: Chennai</span>
                </div>
                <div className="retailerDetails">
                    <span>Name &nbsp;&nbsp;&nbsp;&nbsp;: Stylish Collections</span>
                    <span>Address &nbsp;: Coimbatore</span>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <div className="overlay">
                    <div className='title'>
                        <div className='head'>hi welcome</div>
                        <div>
                            <button className="close" onClick={handleClose}>x</button>
                        </div>
                    </div>

                    <div className = "addProducts">
                    <div className = "products">
                        <div  className = "productTitle">
                            Product Name
                        </div>

                        <div  className = "productTitle">
                            Quantity
                        </div>

                        <div className='productTitle'>
                            Price
                        </div>

                        <div  className = "productTitle">
                            Total Price
                        </div>

                        <div  className = "productTitle">
                           <button className = "addItem">ADD</button>
                        </div>
                    </div>
                        <div  className="add">
                            <div className = "product">
                            <select>
                                <option value="hi">hi</option>
                                <option value="buy">buy</option>
                            </select>
                            </div>

                       <div className = "product">
                        <input></input>
                        </div>

                            <div className = "product">1200</div>

                            <div className = "product">1200</div>
                            <div className = "product">Del</div>
                            
                        </div>
                </div>
                <div className = "supply">
                    <button>Supply</button>
                </div>
                </div>
            </Backdrop>

        </div>
    )
}
export default Header;