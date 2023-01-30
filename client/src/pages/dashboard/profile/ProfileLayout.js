import { Outlet } from "react-router-dom";
import ProfileView from "./ProfileView";
import { ProfileNavbar } from "../../../components";
function SharedLayout() {
  return (
    <>
      <ProfileView />
      <ProfileNavbar
        links={[
          { to: "", label: "About" },
          { to: "conversations", label: "Conversations" },
          { to: "following", label: "Following" },
        ]}
      />

      <Outlet />
    </>
  );
}

export default SharedLayout;
