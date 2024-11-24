"use client";
import { useState, useEffect } from "react";
import SchoolForm from "@/components/create/school/SchoolForm";
import SchoolList from "@/components/create/SchoolList";
import { useRouter } from "next/navigation";
import { decodeToken, getTokenFromCookies } from "@/utils/auth";
import LoadingPage from "@/components/loading/LoadingPage";
import UnauthorizedPage from "@/components/UnauthorizedPage";

export default function Home() {
  const [universities, setUniversities] = useState({ data: [] });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");

  const router = useRouter();

  const handleAddUniversity = async (university) => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const res = await fetch("/api/universities/school", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(university),
      });
      if (res.ok) {
        await fetchUniversitySchools(); // Reload university list after adding
        setSuccessMsg("School created successfully");
      } else {
        setErrorMsg("Failed to add school");
      }
    } catch (error) {
      console.error("Failed to add school:", error);
      setErrorMsg("Failed to add school");
    }
  };

  const fetchUniversitySchools = async () => {
    try {
      const res = await fetch("/api/universities/school");
      const data = await res.json();
      console.log("data:", data);
      if (res.ok) {
        setUniversities(data);
      } else {
        console.error("Failed to fetch universities:", data);
      }
    } catch (err) {
      console.error("Failed to fetch universities:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setRole("");

      try {
        await fetchUniversitySchools();

        const token = getTokenFromCookies();
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
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading) return <LoadingPage />;
  if (role !== "admin") return <UnauthorizedPage />;

  return (
    <div className="container mx-auto p-6 space-y-6 bg-slate-950 flex justify-around flex-col md:flex-row min-h-screen">
      <div className="w-96 pt-6">
        <SchoolForm
          onAdd={handleAddUniversity}
          errorMsg={errorMsg}
          successMsg={successMsg}
          universityName={universityName}
        />
      </div>
      <div>
        <SchoolList universities={universities.data} />
      </div>
    </div>
  );
}
