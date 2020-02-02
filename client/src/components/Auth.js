import 'firebase/auth';
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../utils/auth';

const Auth = () => {
  const hostRef = useRef();
  const { renderSignIn } = useAuth();
  useEffect(() => {
    if (hostRef.current) {
      renderSignIn(hostRef.current);
    }
  });
  return <div id="auth-host" ref={hostRef}></div>;
};

export default Auth;
