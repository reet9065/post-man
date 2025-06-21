import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true); // show spinner while checking auth
  const [error, setError] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_HOST + 'auth', {
          method: 'GET',
          credentials: 'include', 
        });

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message || 'Authentication failed');
        }

        setUserId(json.userId);
      } catch (err) {
        setError(err.message);
        console.error('Auth error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
