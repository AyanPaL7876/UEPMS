import { FaFileSignature } from "react-icons/fa6";
import { FaFileCircleCheck } from "react-icons/fa6";
export default function ModeratorSection() {
  return (
    // <div className="flex gap-5">
    //   <button
    //     type="button"
    //     className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
    //   >
    //     <FaFileSignature className="w-20 h-20 ml-8" />
    //     <p>create Question Paper</p>
    //   </button>

    //   <button
    //     type="button"
    //     className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
    //   >
    //      <FaFileCircleCheck className="w-20 h-20 ml-4" />
    //     <p>select Question Paper</p>
    //   </button>
    // </div>

    <div className="flex flex-col h-[630px] w-auto bg-white">
    {/* Hero Section */}
    <header className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center overflow-x-hidden">
      <div>
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to the Moderator Section
        </h1>
        <p className="text-lg font-light">
          Create and Manage Question paper effortlessly.
        </p>
      </div>
    </header>

    {/* Button Section */}
    <main className="flex-1 container mx-auto py-10 flex gap-10 justify-center">
      <div>
        <button
          type="button"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
        >
          <FaFileSignature className="w-20 h-20 ml-8" />
          <p>create Question Paper</p>
        </button>
      </div>
      <div>
        <button
          type="button"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
        >
          <FaFileCircleCheck className="w-20 h-20 ml-4" />
          <p>select Question Paper</p>
        </button>
      </div>
    </main>
  </div>
  );
}
