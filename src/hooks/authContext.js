import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previousPage, setPreviousPage] = useState('');

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        isLoading,
        setIsLoading,
        previousPage,
        setPreviousPage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};