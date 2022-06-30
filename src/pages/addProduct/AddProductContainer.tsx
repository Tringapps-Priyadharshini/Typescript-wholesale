import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useAppSelector,useAppDispatch} from "../../redux/hooks";
import {v4 as uuidv4} from 'uuid'
import {addProduct} from '../../redux/retailerSlice';
import { ChangeEvent } from "react";
import './addProductContainer.css';

type productType = {
    productDetails:{
        id:string,
        productName:string,
        quantity:number,
        price:number
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
    console.log("wholesale",wholesaleDetails)
    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors}
    } = useForm<productType> ({
        defaultValues: {
            productDetails:[{
                id:uuidv4(),
                productName:'',
                quantity:1,
                price:0
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

    console.log("purchase",purchase)

    const handleChange = (index:number,event:ChangeEvent<HTMLSelectElement>)=> {
        console.log("index",index)
        let name = event.target.value
        const findProduct = wholesaleDetails.find((product)=>product.productName === name)
        console.log(findProduct)
        findProduct && setValue(`productDetails.${index}.price`,findProduct?.price)
        findProduct && setValue (`productDetails.${index}.productName`,name)
        
        console.log("purchase",purchase)
    }

    console.log('asdf',retailerDetails)

   

    const handleClose = () => {
        setOpen(!open);
     };

    const onSubmit = (data:productType) => {
        console.log("data",data)
        console.log(errors)
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

    return(
        <div className="products">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className = "title">
                    <div>{cUser}</div>
                    <div><button onClick = {handleClose}>x</button></div>
                </div>
                <div className = "add">
                <div className = "heading">
                <div className = "name">Product Name</div>
                <div className = "quantity"> Quantity</div>
                <div className = "price">Price (in Rs)</div>
                <div className = "total">Total</div>
                </div>
                
                {
                    fields.map((field,index)=>{
                        return(
                            <>
                            {console.log("wh",wholesaleDetails)}
                            <div key = {field.id} className = "forms">
                            
                                <div className = "items"> <select 
                                {...register(`productDetails.${index}.productName` as const,{
                                    required:true
                                })}
                                onChange = {(event)=>handleChange(index,event)}
                                >
                                    
                                    {
                                        wholesaleDetails.map((product)=>{
                                            return(
                                                product.quantity && <option value = {product.productName}>{product.productName}</option>
                                            )
                                        })
                                    }
                                </select></div>
                                <div className = "items">
                               { purchase[index]?.productName && 
                               
                               <input type = "number" placeholder="quantity" min = {1} max = {getQuantity(purchase[index].productName)}
                                {...register(`productDetails.${index}.quantity` as const,{
                                    required:{value:true,message:'Enter quantity'},
                                    valueAsNumber:true
                                })}
                                />}</div>
                                {errors.productDetails && (<p>{errors.productDetails.message}</p>)}
                                {purchase[index]?.productName &&
                                <>
                                <div className = "items">{getValues(`productDetails.${index}.price`)}</div>
                                <div className = "items">{getValues(`productDetails.${index}.quantity`) * (getValues(`productDetails.${index}.price`))}</div>
                                <div><button onClick = {()=>remove(index)}>remove</button></div>
                                </>
                                }
                            </div>
                            
                            </>
                        )
                    })
                }
                </div>
                <button type = "button" 
                onClick = {()=>append({
                    id:uuidv4(),
                    productName:'',
                    quantity:1
                })}>ADD</button>
                <input type = "submit"/>
            </form>
        </div>
    )
}

export default AddProductContainer;