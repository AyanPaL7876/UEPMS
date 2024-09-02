import { GiTeacher } from "react-icons/gi";
import { useRouter } from 'next/navigation';
export default function HodSection(){ 
  const router = useRouter();

  const handleTeacherClick = () => {
    router.push('/teacher'); 
  };

  return(
    <div className="flex gap-20">
      <div>
        <button
          type="button"
          className="bg-[#0000004a] text-white py-2 px-4 rounded hover:bg-[#00000075] flex flex-col gap-5 bg_blur"
          onClick={handleTeacherClick}
        >
          <GiTeacher className="w-20 h-20 mx-5" />
          <p>create Teacher</p>
        </button>
      </div>
      <div>
        <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
        >
          create Moderator
        </button>
      </div>
    </div>
  )
}