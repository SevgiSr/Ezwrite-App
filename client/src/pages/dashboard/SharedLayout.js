import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default SharedLayout;
