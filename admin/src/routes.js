import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import Orders from "views/admin/orders";
import Products from "views/admin/product";
import Users from "views/admin/users";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";

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
];
export default routes;
