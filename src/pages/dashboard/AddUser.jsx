// ../pages/dashboard/AddUser.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { db, storage } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Card, CardHeader, CardBody, Input, Button, Alert } from "@material-tailwind/react";

function AddUser() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    image: null,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setUserData({
      ...userData,
      image: imageFile,
    });
  };

  const handleAddUser = async () => {
    try {
      // Upload image to storage
      const imageRef = ref(storage, `userImages/${userData.image.name}`);
      await uploadBytes(imageRef, userData.image);

      // Get image URL from storage
      const imageUrl = await getDownloadURL(imageRef);

      // Add user data to Firestore
      const usersCollectionRef = collection(db, "users");
      await addDoc(usersCollectionRef, {
        name: userData.name,
        email: userData.email,
        address: userData.address,
        password: userData.password,
        imageUrl: imageUrl,
      });

      // Reset form fields
      setUserData({
        name: "",
        email: "",
        address: "",
        password: "",
        image: null,
      });
      // Display success message
      setSuccessMessage("User added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  return (
    <div className="flex  justify-center  gap-4">
      <Card className="w-96">
        <CardHeader color="blue-gray" contentPosition="none">
          <h2 className="text-white text-lg font-semibold">Add User</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Name"
              value={userData.name}
              onChange={handleInputChange}
            />
            <Input
              type="email"
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleInputChange}
            />
            <Input
              type="text"
              name="address"
              label="Address"
              value={userData.address}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={userData.password}
              onChange={handleInputChange}
            />
            <Input type="file" onChange={handleImageUpload} />
            <Button color="black" onClick={handleAddUser}>
              Add User
            </Button>
            {successMessage && (
              <Alert color="green">{successMessage}</Alert>
            )}
            <Link to="/dashboard/users">Back to Users</Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddUser;
