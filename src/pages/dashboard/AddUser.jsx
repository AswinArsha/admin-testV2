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
    <div className="flex justify-center mt-8  gap-4">
      <Card className="  w-96">

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
             <div className="border-gray-400 border rounded-lg">
             <label class="block">
             
    <span class="sr-only">Choose profile photo</span>
    <input type="file" onChange={handleImageUpload}  class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-l-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-800 file:text-white
      
    "/>
  </label>
  </div>
          
            <div className="flex pt-4 justify-between">
              <Button color="black" onClick={handleAddUser}>
                Add User
              </Button>

              <Link to="/dashboard/users" className="text-gray-700 font-medium mt-3">Back to Users</Link>
            </div>
            {successMessage && (
              <Alert color="green">{successMessage}</Alert>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default AddUser;
