import DeleteButton from "../../ui/DeleteButton";
import { formatCurrency } from "../../utilities/helpers";
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getQuantityById } from "./cartSlice";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const totalQuantity=useSelector(getQuantityById(pizzaId))
  return (
    <li className="py-3 sm:flex sm:justify-between sm:items-center">
      <p className=" mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className=" text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity currenQuantity={totalQuantity} pizzaId={pizzaId}/>
        <DeleteButton pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
