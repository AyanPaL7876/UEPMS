import { useRouter } from "next/navigation";
import { LuSchool } from "react-icons/lu";
import { GiOfficeChair } from "react-icons/gi";

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

export default function AdminSection() {
  const router = useRouter();

  const buttons = [
    { Icon: GiOfficeChair, text: "Create COE", path: "/dashboard/createcoe" },
    { Icon: LuSchool, text: "View All COEs", path: "/list/coelist" },
  ];

  return (
    <div className="flex flex-col h-[630px] w-auto bg-white">
      <header className="flex-1 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center overflow-x-hidden">
        <div>
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome to the Admin Section
          </h1>
          <p className="text-lg font-light">
            Manage Controller of Examinations (COEs) effortlessly.
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