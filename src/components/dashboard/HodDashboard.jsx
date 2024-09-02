import { FaChalkboardTeacher } from "react-icons/fa";
import { BsPersonVcardFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
export default function HodSection() {
  const router = useRouter();

  const handleTeacherClick = () => {
    router.push("/teacher");
  };

  return (
    <div className="flex gap-20">
      <div>
        <button
          type="button"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
          onClick={handleTeacherClick}
        >
          <FaChalkboardTeacher className="w-20 h-20 mx-5" />
          <p>create Teacher</p>
        </button>
      </div>
      <div>
        <button
          type="button"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
        >
          <BsPersonVcardFill className="w-20 h-20 mx-5" />
          <p>create Moderator</p>
        </button>
      </div>
    </div>
  );
}
