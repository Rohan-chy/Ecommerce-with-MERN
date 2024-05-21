import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Orders from "views/admin/orders/Orders";
import Products from "views/admin/product";
import Users from "views/admin/users";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import OrderDetails from "views/admin/orders/OrderDetails";
import SingleProduct from "views/admin/product/SingleProduct";
import AddProduct from "views/admin/product/AddProduct";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    layout: "/admin",
    path: "orders/:id",
    component: <OrderDetails />,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <Users />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Products />,
  },
  {
    layout: "/admin",
    path: "products/:id",
    component: <SingleProduct />,
  },
  {
    Name:'Add Product',
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "addproduct",
    component: <AddProduct />,
  },
];
export default routes;
