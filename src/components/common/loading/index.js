"use client";

export default function Loading() {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-purple-900 bg-opacity-90 z-50">
      <div className="bg-white/90 p-8 rounded-lg shadow-lg w-64 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-800 mb-4" />
        <div className="text-xl font-semibold text-gray-700">
          Loading...
        </div>
      </div>
    </div>
  );
}
