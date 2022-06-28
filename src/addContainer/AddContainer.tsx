import retailer from '../retailerJson/retailer.json';
import { wholesaleProductType } from '../interface/wholesaleProductType';
import wholesaleDetails from '../wholesaleJson/wholesaleDetails.json';
import './addProductContainer.css';
import { ChangeEvent, useState } from 'react';
// import DisplayContainer from '../DisplayContainer/DisplayContainer';

const AddContainer = ({cUser, open, setOpen }: any) => {
    const [retailerDetails, setRetailerDetails] = useState(retailer);
    const [productDetails, setProductDetails] = useState<wholesaleProductType>(wholesaleDetails);
    const [checkBuy,setCheckBuy] = useState(false)

    const handleChange = (event: any, index: number) => {

        const data = [...retailerDetails];
        data.forEach((retail:any) => {
            if (retail.name === cUser) {
                const product = [...retail.products];
                product[index][event.target.name] = event.target.value;
                setRetailerDetails([...retailerDetails])
                console.log(retailerDetails)
            }

        })
    }


    const handleAdd = () => {
        const data = [...retailerDetails];
        const findRetailer = data.find((retail) => retail.name === cUser)
        findRetailer?.products.push({ productName: '', quantity: 1})
        setRetailerDetails(data)
        console.log(retailerDetails)
    }

    const handleClose = () => {
        setOpen(!open)
    }

    const handleBuy = () => {
        setOpen(!open);
        setCheckBuy(!checkBuy);
    }

    return (
        <>
            {
                retailerDetails.map((retail) => {
                    return (
                        <>
                            {
                                retail.name === cUser && 
                                <>
                                <div className="title">
                                    <div>{retail.name},{retail.address}</div>
                                    
                                </div>
                                {retail.products.map((product, index) => {
                                    return (
                                        <div key={index} className = "item">
                                            
                                            <select name="productName" 
                                            onChange={(event) => { handleChange(event, index) }} 
                                        
                                            value={product.productName}>
                                                <option></option>
                                                {
                                                    productDetails.products.map((product) => {
                                                        return (
                                                            <>
                                                                <option value={product.productName}>{product.productName}</option>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </select>
                                            <input type="number" name="quantity" value={product.quantity}
                                            onChange={(event) => { handleChange(event, index) }}
                                           
                                             >
                                             </input>
                                             {
                                                productDetails.products.map((wholesaleProduct)=>{
                                                    return(
                                                        <>
                                                            {wholesaleProduct.productName === product.productName && 
                                                            <>
                                                            <label>{wholesaleProduct.price}</label>
                                                            <label>{wholesaleProduct.price * product.quantity}</label>
                                                            </>
                                                            }
                                                        </>
                                                    )
                                                })
                                             }
                                             
                                        </div>
                                    )
                                })}
                                </>
                            }
                        </>
                    )
                })
            }
            <div className = "buttons">
            <button type="submit" onClick={handleAdd}>Add</button>
            <button type = "submit" onClick = {handleBuy}>Supply</button>
            <button type = "submit" onClick = {handleClose}>Cancel</button>
            </div>
            {/* {
                {checkBuy} && <DisplayContainer retailerDetails = {retailerDetails}/>
            } */}
        </>
    )
}

export default AddContainer;