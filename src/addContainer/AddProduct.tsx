import { useEffect, useState } from 'react';
import { wholesaleProductType } from '../interface/wholesaleProductType';
import { retailerType } from '../interface/retailerType';
// import {buyType} from '../interface/buyType';
import wholesaleDetails from '../wholesaleJson/wholesaleDetails.json';
import retailer from '../retailerJson/retailer.json';
import './addProductContainer.css';
import DisplayContainer from '../DisplayContainer/DisplayContainer';
const AddProduct = ({ cAddress, cUser, open, setOpen }: any) => {
    const [productDetails, setProductDetails] = useState<wholesaleProductType>(wholesaleDetails);
    // const [retailerDetails,setRetailerDetails] = useState<retailerType>(retailer)
    const [retailerDetails, setRetailerDetails] = useState(retailer);
    
    // const [buy,setBuy] = useState([] as any);
    const [pname, setPname] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(700);
    const [checkDisplay, setCheckDisplay] = useState(false);
    console.log(productDetails)
    useEffect(() => {
        localStorage.setItem("wholesale", JSON.stringify(productDetails));
        //localStorage.setItem("retailers", JSON.stringify(retailerDetails));
    }, [retailerDetails])
    const handleAdd = (event: any) => {
        event.preventDefault();
        console.log(cAddress)
        retailerDetails.forEach((retailerDet) => {
            if (retailerDet.name === cUser) {
                let newProduct = { productName: '', quantity: 1 }
                //respective retailer object
                retailerDet.products.push({
                    productName: pname,
                    quantity: quantity
                });
                retailerDet.products.push(newProduct)
            }
        })
        

        console.log(retailerDetails)

        // setBuy([...buy,{
        //     productName:pname,
        //     quantity:quantity
        // }])
        // setBuy([...retailerDetails,{
        //     // name:cUser,
        //     // address:cAddress,
        //     products:[
        //         {
        //             productName:pname,
        //             quantity:quantity
        //         }
        //     ]
        // }])


    }

    // const handleQuantity = (event: any) => {
    //     setQuantity(event.target.value);
    // }

    // const handleProductName = (event: any) => {
    //     setPname(event.target.value);
    //     productDetails.products.forEach((product) => {
    //         if (product.productName === event.target.value) {
    //             setPrice(product.price)
    //         }
    //     })
    // }

    const handleChange = (event:any,index:number) => {
        let data :any = [...retailerDetails];
        data.forEach((retailerDet:any) => {
            if (retailerDet.name === cUser) {
                //respective retailer object
                retailerDet[index][event.target.name] = event.target.value;
                setRetailerDetails(retailerDet);
            }
        })
    }

    const handleProductName = (event:any) => {
        setPname(event.target.value);
        productDetails.products.forEach((product) => {
            if (product.productName === event.target.value) {
                setPrice(product.price)
            }
        })
    }

    const handleCheck = () => {
        setCheckDisplay(!checkDisplay);
        setOpen(!open)

        // setBuy([...retailerDetails,{
        //     name:cUser,
        //     address:cAddress,
        //     products:[
        //         {
        //             productName:pname,
        //             quantity:quantity
        //         }
        //     ]
        // }])
        // localStorage.setItem("retailer",JSON.stringify(retailerDetails))
        console.log('ere', retailerDetails)

    }

    // const handleChange = (event:any,index:any) => {
    //     event.preventDefault();
    //     let data:any = [...retailerDetails];
    //     data[index][event.target.name] = event.target.value;
    //     retailerDetails.forEach((retailerDet) => {
    //         if (retailerDet.name === cUser) {
    //             //respective retailer object
    //             //retailerDet.products.push(data);
    //             setRetailerDetails(data);
    //         }
    //     })
    
    //     console.log(retailerDetails)
        
    // }

    const handleAddProduct = (event:any) =>{
        event.preventDefault();
        let newProduct = {productName:'',quantity:1}
        console.log(cUser)
        retailerDetails.forEach((retailerDet) => {
            if (retailerDet.name === cUser) {
                //respective retailer object
                let product = [...retailerDet.products];
                console.log("product",product)
                product.push(newProduct);
            }
        })
        console.log(retailerDetails)
        

    }



    return (
        <div>
            <div className="address">
                {cAddress}
            </div>
            <div className="close">
                <button type="submit">x</button>
            </div>
            <form>
                {
                    retailerDetails.map((retailerDet)=>{
                        return(
                            <>
                            
                            {
                               
                                retailerDet.name === cUser &&
                                
                                    retailerDet.products.map((retProduct,index)=>{
                                        return(
                                            <div key = {index}>
                                                <select name = "productName" 
                                                // onChange = {(event)=>handleProductName(event)}
                                                onChange = {(event)=>handleChange(event,index)}
                                                >
                                                    {
                                                        productDetails.products.map((product)=>{
                                                            return(
                                                                <>
                                                                    <option value = {product.productName}>{product.productName}</option>
                                                                </>
                                                            )
                                                        })
                                                    }
                                               
                                                </select>
                                                <input type = "number" name = "quantity" value =  {retProduct.quantity} 
                                                // onChange = {handleQuantity}
                                                onChange = {(event)=>handleChange(event,index)} 
                                                />
                                            </div>
                                        )
                                    })
                                   
                                
                                    // <input type = "number"/> 
                                    
                                
                            }
                            
                            </>
                        )
                    })
                }
                <button type = "submit" onClick = {handleAddProduct}>Add Product</button>

                {/* {
                    retailerDetails.map((retailerDet) => {
                        return (
                    
                                {retailerDet.products.map(() => {
                                    return (
                                        <div>
                                            <select
                                             onChange={(event)=>handleProductName(event)} 
                                    
                                             value = {pname}>
                                                {
                                                    productDetails.products.map((product) => {
                                                        return (
                                                            <>
                                                                <option 
                                                                value={product.productName}
                                                                >{product.productName}</option>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </select>
                                            <input type="number" placeholder='quantity' value={quantity} 
                                            onChange={handleQuantity}
                                           
                                            />

                                            <label>{price}</label>

                                            <label>{quantity * price}</label> <br></br>

                                        </div>
                                    )
                                })}
                            </>
                        )
                    })
                } */}
                {/* <select onChange={handleProductName}>
                    {
                        productDetails.products.map((product) => {
                            return (
                                <>
                                    <option value={product.productName}>{product.productName}</option>
                                </>
                            )
                        })
                    }

                </select> */}
                {/* <input type="number" placeholder='quantity' value={quantity} onChange={handleQuantity} />

                <label>{price}</label>

                <label>{quantity * price}</label> */}
                <button onClick={handleAdd}>+</button>

                <button type="submit" onClick={handleCheck}>Buy</button>

            </form>
            <div>
                {
                    checkDisplay && <DisplayContainer />
                }
            </div>
        </div>
    )
}

export default AddProduct;
