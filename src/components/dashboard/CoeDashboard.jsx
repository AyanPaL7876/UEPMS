import { IoPersonSharp } from "react-icons/io5";
export default function CoeSection() {
  return (
    <div>
      <button
        type="button"
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        <IoPersonSharp className="w-20 h-20 mx-5" />
        <p>create HOD</p>
      </button>
    </div>
  );
}
