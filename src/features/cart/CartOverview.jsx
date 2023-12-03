import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const cart=useSelector(state=>state.cart.cart)
  const cartLength=useSelector(getTotalCartQuantity)
  const total=useSelector(getTotalCartPrice)
  return (
    <div className="bg-stone-800 text-stone-200 uppercas text-sm px-4 py-4 sm:px-6 md:text-base flex justify-between items-center">
      <p className="text-stone-300 font-semibold p-4 space-x-4 sm:space-x-6">
        <span>{cartLength===1?"1 pizza":cartLength>1?`${cartLength} pizzas`:'You chose no pizzas yet 😥😢'}</span>
        <span>{total?`$ ${formatCurrency(total)}`:''}</span>
      </p>
      <Link to="/cart">Open Cart</Link>
    </div>
  );
}

export default CartOverview;
