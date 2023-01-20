import { Outlet } from "react-router-dom";

import ProfileView from "./ProfileView";

function SharedLayout() {
  return (
    <div className="container">
      <ProfileView />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default SharedLayout;
