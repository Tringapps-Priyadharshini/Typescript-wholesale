import { useEffect, useState } from 'react';
import { MouseEvent} from 'react';
import { wholesaleProductType } from '../interface/wholesaleProductType';
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
 
    

    // const handleQuantity = (event: any) => {
    //     setQuantity(event.target.value);
    // }


    const handleChange = (event:any,index:number) => {
        // productDetails.products.forEach((product)=>{
        //     if(product.productName === event.target.value){
        //         setPrice(product.price)
        //         console.log("price",price)
        //     }
        // })

        const res = productDetails.products.find((product)=>product.productName === event.target.value)
        console.log("res",res)
        let data  = [...retailerDetails];
        console.log("data",data)
        data.forEach((retailerDet:any) => {
            if (retailerDet.name === cUser) {
                //respective retailer object
                let prod = [...retailerDet.products]
                prod[index][event.target.name] = event.target.value;
                prod[index]['price'] = res?.price 
               
                setRetailerDetails([...retailerDetails]);
            }
        })
        
        console.log("retailerDetails change", retailerDetails)
        
    }

    const handleProductName = (event:React.ChangeEvent<HTMLInputElement>) => {
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



    const handleAddProduct = (event:MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault();
        let newProduct = {productName:'',quantity:1,price:0}
        retailerDetails.forEach((retailerDet) => {
            if (retailerDet.name === cUser) {
                //respective retailer object
                let product = [...retailerDet.products];
                product.push(newProduct);
                retailerDet.products.push(newProduct)
            }
        })
        console.log("retnew",retailerDetails)
        

    }

        
    
    return (
        <div>
            <div className = "title">
            <div className="address">
                {cAddress}
            </div>
            <div className="close">
                <button type="submit">x</button>
            </div>
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
                                            <>
                                            <div key = {index}>
                                                <select name = "productName" value = {retProduct.productName}
                                                // onChange = {(event)=>handleProductName(event)}
                                                onChange = {(event)=>handleChange(event,index)}
                                                >
                                                    <option></option>
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
                                                
                                                
                                                 <label>{retProduct.price}</label>

                                                 <label>{retProduct.quantity * retProduct.price}</label>

                                            </div>
                                            </>
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
                {/* <button onClick={handleAdd}>+</button> */}

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
