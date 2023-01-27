import { Outlet } from "react-router-dom";
import "../../../assets/ProfileNavbar.css";
import ProfileView from "./ProfileView";
import { ProfileNavbar } from "../../../components";
function SharedLayout() {
  return (
    <>
      <ProfileView />
      <ProfileNavbar />

      <Outlet />
    </>
  );
}

export default SharedLayout;
