import React, { useContext } from "react";
import { ProfileContext } from "@/hooks/ProfileContext";
import Profile from "./Profile";
import ActionButton from "./ActionButton";
import { ChartNoAxesGantt, Plus, User } from "lucide-react";
import Tasks from "./Tasks";

const adminButtons = [
  { href: "/profile/createuser", icon: Plus, label: "Create new User" },
  { href: "/profile/createuser", icon: Plus, label: "Create new Depertment" },
  { href: "/profile/createuser", icon: Plus, label: "Create new School" },
  { href: "/#", icon: ChartNoAxesGantt, label: "Change user Role" },
  { href: "/#", icon: Plus, label: "Update Password" },
  { href: "/#", icon: User, label: "Edit User details" },
];

const coeButtons = [
  { href: "/#", icon: Plus, label: "Create Question paper" },
  { href: "/#", icon: ChartNoAxesGantt, label: "View current Question" },
  { href: "/#", icon: Plus, label: "View Question Status" },
  { href: "/#", icon: User, label: "View Previous year Paper" },
];

const hodButtons = [
  { href: "/#", icon: Plus, label: "Assing Teacher" },
  { href: "/#", icon: Plus, label: "Create new Subject" },
  { href: "/#", icon: ChartNoAxesGantt, label: "View Question Paper" },
  { href: "/#", icon: Plus, label: "Approve Question Paper" },
  { href: "/#", icon: User, label: "Select Final Paper" },
];

function Dashboard() {
  const { profileData } = useContext(ProfileContext);
  return (
    <div className="min-h-[90vh] bg-slate-950 pb-20">
      <Profile />
      {profileData.role === "admin" && <ActionButton buttons={adminButtons} />}
      {profileData.role === "coe" && <ActionButton buttons={coeButtons} />}
      {profileData.role === "hod" && <ActionButton buttons={hodButtons} />}
      {profileData.role === "teacher" && <Tasks />}
    </div>
  );
}

export default Dashboard;
