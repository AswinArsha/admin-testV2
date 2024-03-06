import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      await deleteDoc(userDocRef);
      setUsers(users.filter((user) => user.id !== userId));
      setShowDialog(false); // Close the dialog after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const nextPage = () => {
    if (activePage < Math.ceil(users.length / 5)) {
      setActivePage(activePage + 1);
    }
  };

  const prevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const itemsPerPage = 5;
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleOpenDialog = (userId) => {
    setUserIdToDelete(userId);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setUserIdToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      handleDeleteUser(userIdToDelete);
    }
  };

  // Function to navigate to UserDetails page
  const navigateToUserDetails = (userId) => {
    console.log("Navigating to UserDetails with userId:", userId);
    navigate(`/dashboard/user-details/${userId}`);
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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Spinner className="h-16 w-16 text-gray-900/50" />
            </div>
          ) : (
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID", "Profile", "Name", "Email", "Action"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold text-sm text-blueGray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.slice(startIndex, endIndex).map((user, index) => (
                  <tr key={user.id}>
                    <td className="border-b border-blue-gray-50 py-3 px-5">
                      {startIndex + index + 1}
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-5">
                      <Avatar
                        src={user.imageUrl}
                        alt={user.name}
                        size="sm"
                        variant="rounded"
                      />
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-5">
                      {user.name}
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-5">
                      {user.email}
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-5">
                      <Button
                        color="blue"
                        size="sm"
                        className="mr-2"
                        onClick={() => navigateToUserDetails(user.id)}
                      >
                        View
                      </Button>
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => handleOpenDialog(user.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={prevPage}
              disabled={activePage === 1}
            >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(Math.ceil(users.length / itemsPerPage)).keys()].map(
                (index) => (
                  <IconButton
                    key={index}
                    variant={
                      index + 1 === activePage ? "filled" : "text"
                    }
                    color="gray"
                    onClick={() => setActivePage(index + 1)}
                  >
                    {index + 1}
                  </IconButton>
                )
              )}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2"
              onClick={nextPage}
              disabled={
                activePage === Math.ceil(users.length / itemsPerPage)
              }
            >
              Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Dialog Box */}
      {showDialog && (
        <div
          data-dialog-backdrop="dialog"
          data-dialog-backdrop-close="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        >
          <div data-dialog="dialog" className="w-2/5 bg-white rounded-lg">
            <div className="p-4 text-2xl font-semibold text-blue-gray-900">
              Confirm Deletion
            </div>
            <div className="p-4 text-base text-blue-gray-500">
              Are you sure you want to delete this user?
            </div>
            <div className="flex justify-end p-4">
              <Button
                color="red"
                className="mr-2"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button color="green" onClick={handleConfirmDelete}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
