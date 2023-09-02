import styled from "styled-components";
import OrangeLinks from "../../components/OrangeLinks";
import { Outlet } from "react-router-dom";

function WorkspaceLayout() {
  return (
    <StyledWorkspaceLayout>
      <nav className="main-nav">
        <OrangeLinks
          links={[
            { label: "My Works", to: "myStories" },
            { label: "My Forks", to: "forks" },
          ]}
        />
      </nav>
      <Outlet />
    </StyledWorkspaceLayout>
  );
}

const StyledWorkspaceLayout = styled.div`
  padding: 5rem 0;
  position: relative;
  color: var(--font1);
  margin: 0 auto;

  .main-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    .link {
      font-size: 20px;
    }
  }

  @media only screen and (min-width: 500px) {
    width: 100%;
  }
  @media only screen and (min-width: 768px) {
    width: 680px;
  }
  @media only screen and (min-width: 1350px) {
    width: 790px;
  }
`;

export default WorkspaceLayout;
