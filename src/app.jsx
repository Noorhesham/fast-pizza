import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./ui/Home.jsx";
import Menu ,{loader as menuLoader} from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import CreateOrder , {action as CreateOrderAction} from "./features/order/CreateOrder"
import Order,{loader as orderLoader} from "./features/order/Order"
import {action as updateOrderAction} from "./features/order/UpdateOrder"
import AppLayout from './ui/AppLayout.jsx';
import Error from "./ui/Error"

const Router=createBrowserRouter([
  {
    element:<AppLayout/>,
    errorElement:<Error/>,
    children:[
      {
        path:'',element:<Home/> //the fist default route for the app
    },{
        path:'/menu',
        element:<Menu/>,
        loader:menuLoader,
        errorElement:<Error/>

    },{
      path:"/cart",element:<Cart/>
    },{path:"/order/new",element:<CreateOrder/>,action:CreateOrderAction},
    {path:'/order/:orderId',element:<Order/>,loader:orderLoader,errorElement:<Error/>,action:updateOrderAction}
    ]
  },
 
])

function App() {
  return<RouterProvider router={Router}/>
}

export default App
