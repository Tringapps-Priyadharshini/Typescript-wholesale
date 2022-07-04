import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useAppSelector,useAppDispatch} from "../../../redux/hooks";
import {v4 as uuidv4} from 'uuid'
import {addProduct} from '../../../redux/retailerSlice';
import { ChangeEvent } from "react";
import './addProductComponent.scss';
import { ImCross } from 'react-icons/im';
import {AiFillDelete} from 'react-icons/ai';
import {TiPlus} from 'react-icons/ti';
import {useState } from 'react'



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
    cAddress:string,
    open:boolean,
    setOpen: setOpenType
}
const AddProductComponent = ({cUser,cAddress,open,setOpen}:cUserType) => {
    const dispatch = useAppDispatch();
    const wholesaleDetails = useAppSelector(state=>state.wholesale.products)
    const currentDate = new Date().toLocaleString()
    const [error,setError] = useState(false) 
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
        setError(false)
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
        (purchase[fields.length - 1].productName !== '') ?
            append({id:uuidv4(),productName:'',quantity:1}) 
            :
            setError(true)  
    }


    return(
        <div className="products">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overlay">
                    <div className = "title">
                        <div className="head">
                            <div>{cUser},&nbsp;</div>
                            <div>{cAddress}</div>
                        </div>
                        <div>
                        <ImCross className = "close" onClick = {handleClose}>x</ImCross>
                        </div>
                    </div>
                <div className = "addProducts">
                    <div className = "products">
                        <div className = "productTitle">Product Name</div>
                        <div className = "productTitle">Quantity</div>
                        <div className = "productTitle">Price</div>
                        <div className = "productTitle">Total Price</div>
                        <div className = "productTitle">
                            { fields.length !==  wholesaleDetails.length &&
                            <TiPlus className="addItem" onClick = {addItem} />
                            }
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
                                               product.quantity && <option value = {product.productName} disabled = {purchase.find((purchaseProduct)=>purchaseProduct.productName === product.productName)?true:false} >{product.productName}</option>
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
                {error && <p>Please select a product</p>}

                <div className="supply">
                    <button type = "submit">Supply</button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default AddProductComponent;