import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingPage = ({ message = "Processing, Please wait ..." }) => {
  return (
    <>
      {/* Overlay background to ensure no content shows through */}
      <div className="fixed inset-0 bg-slate-950 z-[9999]" />
      
      <div className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-4 z-[10000]">
        {/* Background gradient effects */}
        {/* <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-gradient-to-r from-blue-500 to-indigo-500 blur-[120px] rounded-full animate-pulse opacity-30" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-500 to-purple-500 blur-[120px] rounded-full animate-pulse delay-300 opacity-30" />
        </div> */}

        <div className="text-center space-y-12 relative">
          {/* Main spinner */}
          <div className="relative flex items-center justify-center">
            <Loader2 className="h-20 w-20 text-blue-500 animate-spin relative z-10" />
          </div>

          {/* Loading Text */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 text-transparent bg-clip-text">
                {message}
              </span>
            </h2>
          </div>

          {/* Enhanced progress bar */}
          
        </div>

        {/* Secondary text with enhanced styling */}
        <p className="mt-12 text-slate-200 text-sm flex items-center gap-2">
          Please wait while we prepare your experience
        </p>

        {/* Corner decorative elements - made larger and more visible */}
        
      </div>
    </>
  );
};



export default LoadingPage;