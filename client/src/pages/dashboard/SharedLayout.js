import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";

function SharedLayout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar />
      <StyledLayout>
        {windowWidth > 900 && <SideNavbar />}
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </StyledLayout>
    </>
  );
}

export default SharedLayout;

const StyledLayout = styled.div`
  overflow: hidden;
  display: flex;
`;

const OutletWrapper = styled.div`
  width: calc(100% - 230px);

  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;
