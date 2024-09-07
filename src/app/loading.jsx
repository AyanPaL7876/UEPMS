import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        <h2 className="mt-4 text-2xl font-semibold text-white">Loading...</h2>
        <p className="mt-2 text-white text-opacity-80">Please wait while we prepare your content</p>
      </div>
    </div>
  );
}