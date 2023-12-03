import { useDispatch } from "react-redux"
import Button from "./Button"
import { decreaseItemQuantity, increaseItemQuantity } from "../features/cart/cartSlice"

function UpdateItemQuantity({pizzaId,currenQuantity}) {
    const dispatch=useDispatch()
    return (
        <div className=" flex gap-2 items-center md:gap-3">
        <Button type="round"onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
        <span className=" text-sm font-semibold ">{currenQuantity}</span>
        <Button type="round"onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div> 
        )
}

export default UpdateItemQuantity
