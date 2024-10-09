import cteareCOE from "@/assets/create/coe.svg";
import cteareHOD from "@/assets/create/hod.svg";
import CteareTeacher from "@/assets/create/teacher.svg";
import CteareModerator from "@/assets/create/moderator.svg";
import ctearePaper from "@/assets/create/paper.svg";

import viewCOE from "@/assets/viewAll/coe.svg";
import viewHOD from "@/assets/viewAll/hod.svg";
import viewTeacher from "@/assets/viewAll/teacher.svg";
import viewModerator from "@/assets/viewAll/moderator.svg";
import viewPaper from "@/assets/viewAll/paper.svg";

import selectTeacher from "@/assets/selectTeacher.svg";
import selectModerator from "@/assets/selectModerator.svg";

const AdminButtons = [
  { Icon: cteareCOE, text: "Create COE", path: "/dashboard/createcoe" },
  { Icon: cteareHOD, text: "Create HOD", path: "/dashboard/createhod" },
  { Icon: viewCOE, text: "View All COEs", path: "/list/coelist" },
  { Icon: viewHOD, text: "View All HODs", path: "/list/hodlist" },
  { Icon: ctearePaper, text: "Create Paper", path: "#" },
  { Icon: viewPaper, text: "View Paper", path: "#" },
];
const COEButtons = [
  { Icon: cteareHOD, text: "Create HOD", path: "/dashboard/createhod" },
  { Icon: viewHOD, text: "View All HODs", path: "/list/hodlist" },
  { Icon: ctearePaper, text: "Create Paper", path: "#" },
  { Icon: viewPaper, text: "View Paper", path: "#" },
];

const HODButtons = [
  { Icon: CteareTeacher, text: "Create Teacher", path: "/dashboard/createteacher" },
  { Icon: CteareModerator, text: "Create Moderator", path: "/dashboard/createmoderator" },
  { Icon: viewTeacher, text: "All Teachers", path: "/list/teacherlist" },
  { Icon: viewModerator, text: "All Moderators", path: "/list/moderatorlist" },
  { Icon: selectTeacher, text: "Select Teacher", path: "/list/teacherlist" },
  { Icon: selectModerator, text: "Select Moderators", path: "/list/moderatorlist" },
];

const TeacherButtons = [
  { Icon: cteareHOD, text: "Create Questions Paper", path: "#" },
  { Icon: viewHOD, text: "Visit all Papers", path: "#" },
];

const ModeratorButtons = [
  { Icon: ctearePaper, text: "Create Questions Paper", path: "#" },
  { Icon: cteareHOD, text: "Select Questions Paper", path: "#" },
  { Icon: viewHOD, text: "Visit all Papers", path: "#" },
];

export { AdminButtons, COEButtons, HODButtons, TeacherButtons, ModeratorButtons };