import Image from 'next/image';

function Button({ Icon, text, onClick }) {
  return (
    <div className="px-6 col mb-8 bg-transparent">
      <div
        className="h-40 text-white font-semibold py-3 px-6 rounded-lg flex flex-col gap-4 justify-center items-center"
        onClick={onClick}
      >
        <Image src={Icon} alt={text} className="w-25 h-25 mx-5 icon_shadow"/>
        <button className="shadow-md transform transition duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 px-4 py-2 rounded-xl flex justify-center items-center">
          <p>{text}</p>
        </button>
      </div>
    </div>
  );
}


export default function Dashboard({ buttons , role }) {

  return (
    <div className="flex flex-col w-auto min-h-[95vh]">
      <header className="flex items-end justify-center text-white pt-[20vh]">
        <div className="mb-2">
          <h1 className="text-5xl font-extrabold p-3 text-center">
            Welcome to the {role} Section
          </h1>
          <p className="text-lg font-light text-center">
            Manage your deperment with elese.
          </p>
        </div>
      </header>

      <main className="container mx-auto py-10 w-2/3">
      <div className="row items-center justify-center">
        {buttons.map((button, index) => (
          <Button
            key={index}
            Icon={button.Icon}
            text={button.text}
            onClick={() => router.push(button.path)}
          />
        ))}
      </div>
    </main>
    </div>
  );
}
