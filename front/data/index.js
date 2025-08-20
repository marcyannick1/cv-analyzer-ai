import { IoHomeOutline } from "react-icons/io5";
import { FaUsers, FaHandshake, FaUserGraduate , FaHospital } from "react-icons/fa";
import { MdBusiness, MdFeedback, MdOutlineLiveHelp } from "react-icons/md";
import { RiUserSettingsLine, RiMedicineBottleLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsFileEarmarkMedical } from "react-icons/bs";

import { MdPayment, } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { FaFileMedical, FaFileAlt } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

import { BsImages } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { PiStudentFill } from "react-icons/pi";
import { FaSitemap } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

export const sidebarItems = [
  { name: "Tableau de bord", path: "/", icon: <IoHomeOutline className="w-4 mr-3" /> },
  { name: "Agents MUSDEEL", path: "/agents", icon: <RiUserSettingsLine className="w-4 mr-3" /> },
  { name: "Hôpitaux", path: "/hospitals", icon: <FaHospital className="w-4 mr-3" /> },
  { name: "Contrats", path: "/contracts", icon: <BsFileEarmarkMedical className="w-4 mr-3" /> },

  { name: "Utilisateurs", path: "/users", icon: <FaUserGroup className="w-4 mr-3" /> },
  { name: "Directions", path: "/directions", icon: <FaSitemap className="w-4 mr-3" /> },
];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/password/confirmation",
  "/auth/password/forgot",
];
