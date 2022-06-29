import { useFieldArray, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import {v4 as uuidv4} from 'uuid'

type productType = {
    productDetails:{
        id:string,
        productName:string,
        quantity:number
    }[]
}

type findRetailerType = {
    name:string ,
    address:string ,
    products:{
        id:string,
        productName:string,
        quantity:number
    }
}

type cUserType = {
    cUser:string
}
const AddProductContainer = ({cUser}:cUserType) => {
    const retailerDetails = useAppSelector(state=>state.retailers.retailers)
    const wholesaleDetails = useAppSelector(state=>state.wholesale)
    console.log("wholesale",wholesaleDetails)
    const {
        register,
        control,
        handleSubmit,
        formState:{errors}
    } = useForm<productType> ({
        defaultValues: {
            productDetails:[{
                id:uuidv4(),
                productName:'',
                quantity:1
            }]
        }
    })
    const { fields, append, remove } = useFieldArray({
        name: "productDetails",
        control
    })

    const onSubmit = (data:productType) => {
        console.log("data",data)
        console.log(errors)
        retailerDetails.find((retailer)=>retailer.name === cUser)?.products.push(data);
        console.log("find Retailer",retailerDetails)
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.map((field,index)=>{
                        return(
                            <div key = {field.id}>
                                <select 
                                {...register(`productDetails.${index}.productName` as const,{
                                    required:true
                                })}
                                >
                                    {
                                        wholesaleDetails.products.map((product)=>{
                                            return(
                                                <option value = {product.productName}>{product.productName}</option>
                                            )
                                        })
                                    }
                                </select>
                                <input type = "number" placeholder="quantity"
                                {...register(`productDetails.${index}.quantity` as const,{
                                    required:{value:true,message:'Enter quantity'},
                                    valueAsNumber:true
                                })}
                                />
                                {errors.productDetails && (<p>{errors.productDetails.message}</p>)}
                                
                                
                            </div>
                        )
                    })
                }
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