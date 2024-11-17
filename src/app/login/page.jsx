"use client";
import { AuthProvider } from '@/hooks/authContext';
import LoginPage from '@/components/login/LoginPage';
import Header from '@/components/login/Header';

const Page = () => {
  return (
    <AuthProvider>
      <Header />
      <LoginPage />
    </AuthProvider>
  );
};

export default Page;