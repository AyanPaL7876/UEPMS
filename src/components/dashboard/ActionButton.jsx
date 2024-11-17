import React from "react";
import Link from "next/link";

function Button({ Icon, label, href }) {
  return (
    <Link href={href}>
      <button className="flex items-center bg-slate-800/50 justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 rounded-xl p-4 text-white font-semibold gap-1 duration-300 transition-all hover:scale-95 backdrop-blur-md shadow-2xl border border-slate-600/30 w-full">
        <Icon className="w-6 h-6" />
        {label}
      </button>
    </Link>
  );
}

function ActionButton({buttons}) {
  return (
    <div className="px-8 py-5 md:p-10 bg-slate-950">
      <div className="max-w-6xl mx-auto grid gap-8">
        <div className="grid md:grid-cols-4 gap-10 duration-300 transition-all">
          {buttons.map(({ icon: Icon, label, href }, index) => (
            <Button key={index} Icon={Icon} label={label} href={href}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ActionButton;
