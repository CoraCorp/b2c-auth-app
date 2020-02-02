import React, { useEffect, useState } from 'react';
import AddressForm from './components/AddressForm';
import Auth from './components/Auth';
import { getAddress } from './services/addressService';
import { useAuth } from './utils/auth';

function App() {
  const { user, signOut } = useAuth();
  const [address, setAddress] = useState({});

  useEffect(() => {
    if (user) {
      getAddress().then(add => setAddress(add));
    }
  }, [user]);

  function handleSignOutClick() {
    signOut();
  }
  return (
    <div>
      {user ? (
        <div>
          <div>
            <button onClick={handleSignOutClick}>Sign Out</button>
          </div>
          <AddressForm address={address} />
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
