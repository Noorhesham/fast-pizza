import { useState } from "react";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import store from "../../store";
import { clear, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utilities/helpers";
import { fetchAddress } from "../userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAdress = addressStatus === "loading";

  const price = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? price * 0.2 : 0;
  const totalPrice = price + priorityPrice;

  const formErrors = useActionData();
  if (!cart.length)
    return (
      <div>
        <p className="mt-4 font-semibold mb-3">
          You have not added any pizzas to your cart yet ...😢 Go get some of
          our great pizzas🍕
        </p>
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      </div>
    );
  //this is a form element provided from the react router library
  //it collects all input names as props names,keys and values as prop values and makes a new object when we submit
  //this new object is placed in the action
  return (
    <div className=" py-6 px-4">
      <h2 className=" mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          {/*we have the input wrapped in a grow div which its width is for the input so we have to make the input full width
          if we have the input alone not inside ta div we can make it grow*/}
          <label className=" sm:basis-40">First Name</label>
          <input
            autoComplete="off"
            defaultValue={userName}
            type="text"
            name="customer"
            required
            className="input grow"
          />
        </div>
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              autoComplete="off"
              type="tel"
              name="phone"
              required
              className="input w-full"
            />
          </div>
        </div>
        {formErrors?.phone && (
          <p className="bg-red-100 text-red-700 my-5 rounded-md p-1 px-2">
            {formErrors.phone}
          </p>
        )}

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className=" sm:basis-40">Address</label>
          <div className=" grow">
            <input
              autoComplete="off"
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingAdress}
              defaultValue={address}
            />
            {addressStatus === "error" && (
              <p className="bg-red-100 text-red-700 my-5 rounded-md p-1 px-2">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="px-3 absolute right-[1px] z-10 top-[34px] sm:top-[3px] md:right-[-3px] ">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className=" flex items-center mb-12 gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className=" font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" value={JSON.stringify(cart)} name="cart" />
        <input type="hidden" value={position.longitude&&position.latitude?`${position.latitude},${position.longitude}`:''} name="position" />
        <div>
          <Button disabled={isSubmitting || isLoadingAdress} type="primary">
            {isSubmitting
              ? "placing order"
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const FormData = await request.formData(); //get the request data from the form
  const data = Object.fromEntries(FormData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  const neworder = await createOrder(order); //upload the data to the api and getting a new order
  store.dispatch(clear());
  return redirect(`/order/${neworder.id}`);
}

export default CreateOrder;
