import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useAppSelector,useAppDispatch} from "../../../redux/hooks";
import {v4 as uuidv4} from 'uuid'
import {addProduct} from '../../../redux/retailerSlice';
import { ChangeEvent } from "react";
import './addProductComponent.css';
import { AiFillDelete } from 'react-icons/ai';
import {useState} from 'react'

type productType = {
    productDetails:{
        id:string,
        productName:string,
        quantity:number,
        price:number,
        date:string
    }[]
}

type setOpenType = (type:boolean) =>void
type cUserType = {
    cUser:string,
    open:boolean,
    setOpen: setOpenType
}
const AddProductContainer = ({cUser,open,setOpen}:cUserType) => {
    const dispatch = useAppDispatch();
    const retailerDetails = useAppSelector(state=>state.retailers.retailers)
    const wholesaleDetails = useAppSelector(state=>state.wholesale.products)
    const [checkProduct,setProduct] = useState('')
    const currentDate = new Date().toLocaleString()
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
    } = useForm<productType> ({
        defaultValues: {
            productDetails:[{
                id:uuidv4(),
                productName:'',
                quantity:1,
                price:0,
                date: currentDate
            }]
        }
    })
    const { fields, append,remove} = useFieldArray({
        name: "productDetails",
        control
    })

    const purchase = useWatch({
        control,
        name:'productDetails'
    })


    const handleChange = (index:number,event:ChangeEvent<HTMLSelectElement>)=> {
        let name = event.target.value
        const findProduct = wholesaleDetails.find((product)=>product.productName === name)
        findProduct && setValue(`productDetails.${index}.price`,findProduct?.price)
        findProduct && setValue (`productDetails.${index}.productName`,name)
        findProduct && setValue (`productDetails.${index}.date`,currentDate)
    }
   
    const handleClose = () => {
        setOpen(!open);
     };

    const onSubmit = (data:productType) => {
        const sendData = {
            products:data.productDetails,
            currentUser:cUser
        }
        dispatch(addProduct(sendData))
        handleClose()
    }

    const getQuantity = (productName:string) => {
        return wholesaleDetails.find((product)=>product.productName === productName)?.quantity
    }

    

    const addItem = () => {
        if(purchase[fields.length - 1].productName !== '') 
        {
            append({id:uuidv4(),productName:'',quantity:1}) 
            setProduct(purchase[fields.length-1].productName)
        }
        else    
            alert("Enter Valid Details")
        
    }


    return(
        <div className="products">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overlay">
                    <div className = "title">
                        <div className="head">{cUser}</div>
                        <div>
                        <button className = "close" onClick = {handleClose}>x</button>
                        </div>
                    </div>
                <div className = "addProducts">
                    <div className = "products">
                        <div className = "productTitle">Product Name</div>
                        <div className = "productTitle">Quantity</div>
                        <div className = "productTitle">Price</div>
                        <div className = "productTitle">Total Price</div>
                        <div className = "productTitle">
                            <button type = "button" className="addItem" onClick = {addItem}>ADD</button>
                        </div>
                    </div>

                
                {
                    fields.map((field,index)=>{
                        return(
                            <>
                            <div key = {field.id} className = "add">
                            
                                <div className = "product"> <select 
                                {...register(`productDetails.${index}.productName` as const,{
                                    required:true
                                })}
                                onChange = {(event)=>handleChange(index,event)}
                                >
                                    {
                                        wholesaleDetails.map((product)=>{
                                            return(
                                              checkProduct !== product.productName && product.quantity && <option value = {product.productName}>{product.productName}</option>
                                            )
                                        })
                                    }
                                </select>
                                
                                </div>
                                <div className = "product">
                               { purchase[index]?.productName && 
                               
                               <input type = "number" placeholder="quantity" min = {1} max = {getQuantity(purchase[index].productName)}
                                {...register(`productDetails.${index}.quantity` as const,{
                                    required:true,
                                    valueAsNumber:true
                                })}
                                />}</div>
                                {purchase[index]?.productName &&
                                <>
                                    <div className = "product">{getValues(`productDetails.${index}.price`)}</div>
                                    <div className = "product">{getValues(`productDetails.${index}.quantity`) * (getValues(`productDetails.${index}.price`))}</div>
                                    <div className = "product">
                                        {fields.length >1 && <AiFillDelete onClick = {()=>remove(index)} className = "delete"/>}
                                        
                                    </div>
                                    </>
                                }
                            </div>
                            
                            </>
                        )
                    })
                }

                </div>
                <div className="supply">
                    <button type = "submit">Supply</button>
                </div>


            </div>
            </form>
        </div>
    )
}

export default AddProductContainer;