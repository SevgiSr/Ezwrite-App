import styled from "styled-components";
import OrangeLinks from "../../components/OrangeLinks";
import { Outlet, useLocation } from "react-router-dom";

function WorkspaceLayout() {
  const location = useLocation();
  const tab = location.pathname.split("/")[2];
  return (
    <StyledWorkspaceLayout>
      <nav className="main-nav">
        <OrangeLinks
          links={[
            {
              label: "My Works",
              to: "myStories/",
              active: tab === "myStories",
            },
            {
              label: "My Forks",
              to: "myForks/",
              active: tab === "myForks",
            },
          ]}
        />
      </nav>
      <Outlet />
    </StyledWorkspaceLayout>
  );
}

const StyledWorkspaceLayout = styled.div`
  padding: 3rem 20px;
  position: relative;
  color: var(--font1);
  margin: 0 auto;
  max-width: 790px;

  .main-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    .link {
      font-size: 23px;
    }
  }
`;

export default WorkspaceLayout;
