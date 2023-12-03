import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; //provided to determine the state of the app if it is loading or not

  return (
    //this is the layout that will reamin static all over the app like the header the loader if something is loading and the cart overview footer
    <div className="grid grid-rows[auto_1fr_auto]  h-screen">
      {isLoading && <Loader />}
      <Header />
      <div className=" overflow-auto">
        <main className=" mx-auto max-w-3xl overflow-auto">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
//the outlet that recives and renders all the nested child routes elements  based on the path

export default AppLayout;
