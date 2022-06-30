
import { useAppSelector } from "../../redux/hooks";
const DisplayProduct = () => {
    const retailerDisplay = useAppSelector(state=>state.retailers.retailers)
    return(
        <div>
            {
                retailerDisplay.map((display)=>{
                    return(
                        <div>
                            {display.name}
                        </div>
                    )
                })
            }

        </div>
    )
}

export default DisplayProduct;