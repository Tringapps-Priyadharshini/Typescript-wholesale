import { useState } from 'react';
import { wholesaleProductType } from '../interface/wholesaleProductType';
import wholesaleDetails from '../wholesaleJson/wholesaleDetails.json';
const AddProduct = () => {
    const [productDetails, setProductDetails] = useState<wholesaleProductType>(wholesaleDetails);
    const [pname, setPname] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState<null | number>(null);
    const [price,setPrice] = useState(0);
    console.log(productDetails)
    const handleBuy = () => {

    }

    // const Amount = () => {
    //     return(
    //         productDetails.products.forEach((product)=>{
    //             if(product.productName === pname){
    //                 let total:number = product.price * quantity;
    //                 setTotalPrice(total);
    //             }
    //         })
    //     )

    // }

    const handleQuantity = (event: any) => {
        setQuantity(event.target.value);
        productDetails.products.forEach((product) => {
            if (product.productName === pname) {
                console.log("quantity",quantity)
                setPrice(product.price)
                let total: number = product.price * quantity;
                setTotalPrice(total);
            }
        })

    }

    const handleProductName = (event: any) => {
        setPname(event.target.value);
        productDetails.products.forEach((product) => {
            if (product.productName === pname) {
                console.log("quantity",quantity)
                setPrice(product.price)
            }
        })

    }

    // const handleAdd=()=>{
    //     setProductDetails({...productDetails,[{productName:pname,quantity:quantity}]})
    // }
    return (
        <div>
            <form>
                <select onChange={handleProductName} value={pname}>
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
                <input type="number" placeholder='quantity' value={quantity} onChange={handleQuantity} />
                {/* <Amount /> */}
                <label>{price}</label>

                <label>{totalPrice}</label>
                {/* <button onClick = {handleAdd}>+</button>  */}
                <button type="submit" onClick={handleBuy}>Buy</button>

            </form>
        </div>
    )
}

export default AddProduct;