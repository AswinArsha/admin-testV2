// UserDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

function UserDetails() {
  const { userId } = useParams();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
        const userDataFromFirestore = userDocSnapshot.data();

        // Assuming profile image is stored in storage
        const profileImageRef = storage.ref(`profiles/${userId}/profile.jpg`);
        const profileImageUrl = await profileImageRef.getDownloadURL();

        const userDataWithProfileImage = {
          ...userDataFromFirestore,
          profileImageUrl,
        };

        console.log('User data fetched:', userDataWithProfileImage);
        setUserData(userDataWithProfileImage);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    console.log('User data:', userData); // Check userData state variable
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="profile-page">
      {/* User details section */}
      <section className="relative block h-500-px">
        {/* Background image */}
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
          backgroundImage: `url('${userData.profileImageUrl}')`
        }}>
          <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        {/* Background overlay */}
        <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{ transform: 'translateZ(0px)' }}>
          <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      {/* User information section */}
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            {/* User profile image and action buttons */}
            <div className="px-6">
              {/* User profile image */}
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img alt="..." src={userData.profileImageUrl} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                  </div>
                </div>
              </div>
              {/* User details */}
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">{userData.name}</h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {userData.address} {/* Assuming address is a field in userData */}
                </div>
              </div>
              {/* Additional user details */}
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
