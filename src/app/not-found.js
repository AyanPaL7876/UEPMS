// Code: 404 Page Not Found

"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.back();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-white tracking-widest">
            404
          </h1>
          <div className="bg-sky-400 px-2 text-base rounded -rotate-12 absolute mb-2">
            Page Not Found
          </div>
          <div className="text-white text-2xl font-medium pt-2">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </div>
          
          <p className="text-gray-300">
            Redirecting to previous page in {countdown} seconds...
          </p>
        </div>
        
        <div className="flex flex-col space-y-4 mt-8">
          <button
            onClick={() => router.back()}
            className="btn_color font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="bg-gray-700 hover:bg-gray-800 text-white btn_hover font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </button>
        </div>
        
        <div className="mt-8 text-gray-400">
          <p>Need assistance? <a href="/contact" className="text-sky-400 hover:text-sky-300 underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
}