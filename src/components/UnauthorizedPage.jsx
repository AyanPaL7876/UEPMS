import React from 'react';
import { ShieldAlert, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

const UnauthorizedPage = ({ message = "You don't have permission to access this page." }) => {
  return (
    <div className="min-h-[90vh] bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Error Icon */}
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
        </div>

        {/* Error Content */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-2">401</h1>
          <h2 className="text-2xl font-semibold text-gray-100 mb-8">
            Unauthorized Access
          </h2>
        </div>

        {/* Error Message */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Go Back
          </button>
          
          <Link
            href="/profile"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            Return to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;