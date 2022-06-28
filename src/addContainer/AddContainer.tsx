import retailer from '../retailerJson/retailer.json';
import {useState} from 'react';
const AddContainer = () => {
    const [ret,setRetDetails] = useState(retailer);


    const handleChange = (event:any,index:number) =>{
        let data:any = [...ret];
        data.forEach((retail: { name: string; products: any; })=>{
            if(retail.name === 'retailer1'){
                let prod = [...retail.products];
                prod[index][event.target.name] = event.target.value;
                setRetDetails([...ret])

            }
        })
    }

    const handleAdd=()=>{    
        let data:any = [...ret];
        data.forEach((retail: { name: string; products: any; })=>{
            if(retail.name === 'retailer1'){
                retail.products.push({productName:'',quantity:1,price:0});
                console.log('ret',ret)

            }
        })

    }
    return(
        <>
        <p>heklllo world</p>
            {console.log(ret)}
            {
                ret.map((retail)=>{
                    return(
                        <>
                        <p>{retail.name}</p>
                        <p>{retail.address}</p>
                        {
                           retail.name === 'retailer1' && retail.products.map((product,index)=>{
                                return(
                                    <div key = {index}>
                                        <select name = "productName" onChange = {(event)=>{handleChange(event,index)}} value = {product.productName}>
                                            <option value = "as">as</option>
                                            <option value = "df">df</option>
                                        </select>
                                        <input type = "number" name = "quantity" value = {product.quantity} onChange = {(event)=>{handleChange(event,index)}}></input>
                                    </div>
                                )
                            })
                        }
                        </>
                    )
                })
            }
            <button type = "submit" onClick = {handleAdd}>add</button>
        </>
    )
}

export default AddContainer;