import { useRouter } from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";

function Button({ Icon, text, onClick }) {
  return (
    <button
      type="button"
      className="h-40 text-white font-semibold py-3 px-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 flex flex-col gap-4 justify-center items-center"
      onClick={onClick}
    >
      {Icon && <Icon className="w-20 h-20 mx-5" />}
      <p>{text}</p>
    </button>
  );
}

export default function CoeSection() {
  const router = useRouter();

  const buttons = [
    { Icon: FaUserTie, text: "Create HOD", path: "/dashboard/createhod" },
    { Icon: HiUserGroup, text: "View All HODs", path: "/list/hodlist" },
  ];

  return (
    <div className="flex flex-col h-[630px] w-auto bg-white">
      <header className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center overflow-x-hidden">
        <div>
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to the COE Section
          </h1>
          <p className="text-lg font-light">
            Manage Heads of Departments (HODs) effortlessly.
          </p>
        </div>
      </header>
      <main className="flex-1 container mx-auto py-10 flex gap-10 justify-center">
        {buttons.map((button, index) => (
          <Button
            key={index}
            Icon={button.Icon}
            text={button.text}
            onClick={() => router.push(button.path)}
          />
        ))}
      </main>
    </div>
  );
}