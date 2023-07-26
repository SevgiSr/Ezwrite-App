import { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import SideNavbar from "./SideNavbar";
import styled from "styled-components";

function SharedLayout() {
  return (
    <>
      <Navbar />
      <StyledLayout>
        <SideNavbar />
        <OutletWrapper>
          <Outlet />
        </OutletWrapper>
      </StyledLayout>
    </>
  );
}

export default SharedLayout;

const StyledLayout = styled.div`
  display: flex;
`;

const OutletWrapper = styled.div`
  width: calc(100% - 230px);
`;
