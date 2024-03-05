// ../dashboard/Users.jsx
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Navigate for redirection
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
} from "@material-tailwind/react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Users Table
          </Typography>
          <Link to="/dashboard/add-user">
            <Button color="white" ripple="light">
              Add User
            </Button>
          </Link>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Image", "Name", "Email", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ id, name, email, imageUrl }) => (
                <tr key={id}>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Avatar src={imageUrl} alt={name} size="sm" variant="rounded" />
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {name}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    {email}
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-5">
                    <Link to={`/dashboard/users/${id}`}>
                      <Button color="blue" size="sm" className="mr-2">
                        View
                      </Button>
                    </Link>
                    <Button color="red" size="sm" onClick={() => handleDeleteUser(id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Users;
