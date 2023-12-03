import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import { addtoCart, getQuantityById, increaseItemQuantity } from "../cart/cartSlice";
import DeleteButton from "../../ui/DeleteButton"
import UpdateItemQuantity from "../../ui/UpdateItemQuantity";
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const quantity=useSelector(getQuantityById(id))
  const isInCart=quantity>0;
  const dispatch=useDispatch()
  function handleAdd(){
    const newpizza={
      pizzaId:id,name,unitPrice,totalPrice:unitPrice*1,quantity:1
    }
    if(isInCart) dispatch(increaseItemQuantity(id))
    else dispatch(addtoCart(newpizza))
  }
  return (
    <li className=" flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex flex-col grow ">
        <p className=" font-medium">{name}</p>
        <p className="text-sm italic text-stone-600 mt-1 capitalize">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between ">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className=" text-red-600 uppercase font-medium">Sold out</p>
          )}
        {isInCart&&<div className=" flex items-center gap-3 sm:gap-8" >
          <UpdateItemQuantity currenQuantity={quantity} pizzaId={id}/>
          <DeleteButton pizzaId={id}/>
          </div>}
        {!soldOut&&!isInCart&&<Button onClick={handleAdd} type="small">Add To Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
