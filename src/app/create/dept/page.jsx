"use client";
// create School page
import { useState, useEffect } from "react";
import EditForm from "@/components/create/school/editForm";
import SchoolList from "@/components/create/SchoolList";
import { useRouter } from "next/navigation";
import { decodeToken, getTokenFromCookies } from "@/utils/auth";
import LoadingPage from "@/components/loading/LoadingPage";
import UnauthorizedPage from "@/components/UnauthorizedPage";

export default function Home() {
  const [universities, setUniversities] = useState({ data: [] });
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [universityName, setUniversityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");

  const router = useRouter();

  const handleAddUniversity = async (university) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/universities/dept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(university),
      });
      if (res.ok) {
        fetchUniversitySchools();
        setSuccessMsg("Department update successfully");
      } else {
        setErrorMsg("Failed to update Department");
      }
    } catch (error) {
      console.error("Failed to update Department:", error);
      setErrorMsg("Failed to update Department");
    }
  };

  const fetchUniversitySchools = async () => {
    fetch("/api/universities/school")
      .then((res) => res.json())
      .then((data) => setUniversities(data))
      .catch((err) => console.error("Failed to fetch universities:", err));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setRole("");
  
      try {
        // Fetch universities data
        await fetchUniversitySchools();
  
        const token = getTokenFromCookies();
  
        // If no token, redirect to login
        if (!token) {
          router.push("/login");
          return;
        }
  
        const data = decodeToken(token);
        setUniversityName(data.universityName);
        setRole(data.role);
      } catch (error) {
        console.error("An error occurred:", error);
        router.push("/login");
      } finally {
        setIsLoading(false); // Stop loading only after async operations complete

      }
    };
  
    fetchData();
  }, [router]);
  

  if (isLoading) {
    return (
      <>
        <LoadingPage />
      </>
    );
  }

  if (role !== "admin") {
    return (
      <>
      <UnauthorizedPage/>
      </>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 bg-slate-950 flex justify-around flex-col md:flex-row min-h-screen">
      <div className="w-96 pt-6">
        <EditForm
          universities={universities.data}
          onAdd={handleAddUniversity}
          errorMsg={errorMsg}
          successMsg={successMsg}
          universityName={universityName}
        />
      </div>
      <div className="">
        <SchoolList universities={universities.data} />
      </div>
    </div>
  );
}
