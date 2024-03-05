// App.jsx
import { Routes, Route } from "react-router-dom"; 
import { Dashboard, Auth } from "@/layouts";
import { UserDetails, AddUser, Users } from "@/pages/dashboard"; 

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="add-user" element={<AddUser />} />
        <Route path="users" element={<Users />} />
        <Route path="user-details/:userId" element={<UserDetails />} />
        {/* 
          ^ Adjusted the route path to be relative to the parent /dashboard/* route
          Remove the leading /dashboard/ from the path
        */}
      </Route>
      <Route path="/auth/*" element={<Auth />} />
    </Routes>
  );
}

export default App;
