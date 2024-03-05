//routes.jsx
import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
  
} from "@heroicons/react/24/solid";
import { Home, Users, AddUser } from "@/pages/dashboard"; // Import AddUser component
import { SignIn } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

const showAddUserButton = false; 

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Users",
        path: "/users",
        element: <Users />,
      },
      {
        name: "Add User",
        path: "/add-user",
        element: <AddUser />,
        className: showAddUserButton ? "" : "hidden", // Add className based on showAddUserButton
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Log Out",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
