import { useLoaderData } from "react-router-dom";
import {getMenu} from "../../services/apiRestaurant"
import Menuitem from "./MenuItem"
function Menu() {
  const menu=useLoaderData() //het the fetched data from the loader 
  return <ul className=" divide-y divide-stone-200 px-4 py-2">
    {menu.map(pizza=><Menuitem pizza={pizza} key={pizza.id}/>)}
  </ul>;
}
export async function loader(){
  const menu=await getMenu();
  return menu;
}
export default Menu;
