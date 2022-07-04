import './displayProduct.scss';
import { useAppSelector } from "../../../redux/hooks";
const DisplayProduct = () => {
    const retailerDetails = useAppSelector(state=>state.retailers.retailers)
    return(
        <div className = "displayDetails">
        {
            retailerDetails.map((retailerDetail)=>{
                return(
                    <div className = "retailerDetails">
                       <span> NAME &nbsp;&nbsp;&nbsp;&nbsp; : {retailerDetail.name} </span>
                       <span> ADDRESS : {retailerDetail.address} </span>
                        
                        { retailerDetail.products.length !== 0 ? retailerDetail.products.map((product)=>{
                        return(
                            <div className='productsList'>
                                <span className='date'>{product.date}</span>
                                <label className = "items">name &nbsp;&nbsp;&nbsp;&nbsp; : {product.productName}</label>
                                <label className = "items">quantity &nbsp;: {product.quantity}</label>
                            </div>
                        )
                       
                       }):<p>No Orders</p>}
                     
                    </div>
                )
            })
        }
    </div>
    )
}

export default DisplayProduct;