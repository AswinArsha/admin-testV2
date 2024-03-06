// App.jsx
import { Routes, Route, Navigate } from "react-router-dom"; // Make sure to include Navigate
import { Dashboard, Auth } from "@/layouts";
import {  AddUser, Users } from "@/pages/dashboard"; 

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />}>
        <Route path="add-user" element={<AddUser />} />
        <Route path="users" element={<Users />} />
      
       
      </Route>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

export default App;
