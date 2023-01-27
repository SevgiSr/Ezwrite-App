import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default SharedLayout;
