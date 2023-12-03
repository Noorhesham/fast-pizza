import { useDispatch } from "react-redux"
import Button from "./Button"
import { deleteItemCart } from "../features/cart/cartSlice"
function DeleteButton({pizzaId}) {
    const dispatch=useDispatch()
    return (
        <Button onClick={()=>dispatch(deleteItemCart(pizzaId))} type="small">Delete</Button>
    )
}

export default DeleteButton
