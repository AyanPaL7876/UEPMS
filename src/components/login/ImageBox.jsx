"use client";
import Image from "next/image";
import loginImg from "@/assets/img/loging.jpg";

const ImageBox = ({ onSubmit }) => {

  return (
    <div className="w-full md:w-1/2 bg-transparent items-center justify-center hidden md:flex">
      <Image
        src={loginImg}
        alt="Login"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default ImageBox;
