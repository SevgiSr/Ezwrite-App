import { NavLink, Outlet } from "react-router-dom";
import "../../../assets/ProfileNavbar.css";
import ProfileView from "./ProfileView";

import { Link } from "react-router-dom";
import { ProfileNavbar } from "../../../components";
function SharedLayout() {
  return (
    <div className="container">
      <ProfileView />
      <ProfileNavbar />

      <Outlet />
    </div>
  );
}

export default SharedLayout;
