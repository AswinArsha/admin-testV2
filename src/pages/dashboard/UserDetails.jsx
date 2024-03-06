//UserDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { getDoc, doc } from "firebase/firestore";
import { Spinner } from "@material-tailwind/react";

function UserDetails() {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data for user ID:', userId);
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDataFromFirestore = userDocSnapshot.data();

        console.log('User data fetched:', userDataFromFirestore);
        setUserData(userDataFromFirestore);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    console.log('User data:', userData); // Check userData state variable
  }, [userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner  className="h-16 w-16 text-gray-900/50" />
      </div>
    );
  }

  if (!userData) {
    return <div>No user data found</div>; // Display a message if no user data is found
  }

  return (
    <main className="">
      {/* User details section */}
      <section className="relative block h-500-px">
        {/* Background image */}
        {/* You can add background image if available in userData */}
      </section>
      {/* User information section */}
      <section className="relative top-60 py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            {/* User profile image and action buttons */}
            <div className="px-6">
              {/* User profile image */}
              <img src={userData.imageUrl} alt="Profile" className="w-32 h-32 mx-auto rounded-full" />
              {/* User details */}
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{userData.name}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userData.address}
                </div>
              </div>
              {/* User description */}
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">Email: {userData.email}</p>
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">Password: {userData.password}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default UserDetails;