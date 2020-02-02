import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import React, { useContext, useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyCPbdFzMe8efnyAmzIK8Sj0vi2LXUtXvpg',
  authDomain: 'gravaddress-consumer-app.firebaseapp.com',
  databaseURL: 'https://gravaddress-consumer-app.firebaseio.com',
  projectId: 'gravaddress-consumer-app',
  storageBucket: 'gravaddress-consumer-app.appspot.com',
  messagingSenderId: '343734860363',
  appId: '1:343734860363:web:2ff006c022e365955cebce',
  measurementId: 'G-2P12K5Z74K'
};

firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged((u, ...args) => {
      setUser(u);
    });
  });

  function signOut() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  function renderSignIn(container) {
    ui.start(`#${container.id}`, {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: authResult => {
          localStorage.setItem('user', JSON.stringify(authResult));
          return true;
        }
      },
      signInSuccessUrl: 'http://localhost:3000'
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        renderSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
