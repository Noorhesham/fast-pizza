import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "../cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "./cartSlice";
// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const user = useSelector((state) => state.user.userName);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch=useDispatch()
  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {user}</h2>
      {cart.length ? (
        <>
          <ul className=" divide-y divide-stone-200 border-b mt-3  ">
            {cart.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </ul>
          <div className="mt-6 space-x-2">
            <Button type="primary" to="/order/new">
              Order pizzas
            </Button>
            <Button onClick={()=>dispatch(clear())} type="seconday">Clear cart</Button>
          </div>
        </>
      ) : (
        <p className="mt-4 font-semibold">
          You have not added any pizzas to your cart yet ...😢 Go get some of
          our great pizzas🍕
        </p>
      )}
    </div>
  );
}

export default Cart;
