import { useContext, useEffect, useState } from "react";
import NavLinks from "../../components/NavLinks";
import StyledSettings from "./styles/Settings.styled";
import { ProfileContext } from "../../context/profileContext";

function Settings() {
  const [navbar, setNavbar] = useState("connect");
  const { profileState, getProfileSettings } = useContext(ProfileContext);
  const [settings, setSettings] = useState({ name: "", AIKey: "" });
  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getProfileSettings();
  }, []);

  useEffect(() => {
    setSettings({ ...profileState.profileSettings });
  }, [profileState.profileSettings]);

  return (
    <StyledSettings>
      <div className="main">
        <header>
          <NavLinks
            links={[
              {
                to: "",
                label: "Connect AI",
                handleClick: () => setNavbar("connect"),
              },
              {
                to: "",
                label: "Account",
                handleClick: () => setNavbar("account"),
              },
            ]}
          />
        </header>
        {navbar === "connect" && (
          <form>
            <input
              placeholder="Your AI key"
              value={"*".repeat(settings.AIKey?.length)}
            />
            <button type="submit">Connect AI</button>
          </form>
        )}

        {navbar === "account" && (
          <form>
            <input
              type="text"
              value={settings.name}
              onChange={handleChange}
              name="name"
            />
          </form>
        )}
      </div>
    </StyledSettings>
  );
}

export default Settings;
