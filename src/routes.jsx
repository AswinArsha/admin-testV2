import {
  HomeIcon,
  UserCircleIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Users, AddUser, UserDetails } from "@/pages/dashboard"; // Import UserDetails component
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
        icon: <UserCircleIcon {...icon} />, 
        name: "User Details", 
        path: "/user-details/:userId", 
        element: <UserDetails />,
        className: showAddUserButton ? "" : "hidden",
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
