import { useState, useContext, useEffect } from "react";
import { FormRow, Alert } from "../components";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import StyledRegister from "./styles/Register.styled";
import { BsBookFill } from "react-icons/bs";
import Blob from "../components/Blob";

const initialUser = {
  name: "",
  password: "",
  isMember: true,
};

function Register() {
  const navigate = useNavigate();

  const { registerUser, loginUser, userState } = useContext(UserContext);
  const [user, setUser] = useState(initialUser);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleMember = () => {
    setUser({ ...user, isMember: !user.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, password, isMember } = user;
    if (!password || !name || name === "") {
      console.log("provide all values");
      return;
    }
    const currentUser = { name, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (userState.user && userState.token) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [userState.user, userState.token, navigate]);

  return (
    <StyledRegister>
      <div className="container">
        {userState.showAlert && <Alert />}
        <form className="form glass" onSubmit={onSubmit}>
          <h3 className="orange-text">
            {user.isMember ? "Login" : "Register"} to start writing!
            <div className="book-icon">
              <BsBookFill style={{ color: "#d25e00", position: "relative" }} />
            </div>
          </h3>
          <FormRow
            type="text"
            value={user.name}
            name="name"
            labelText="username"
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            value={user.password}
            name="password"
            handleChange={handleChange}
          />
          <button className="btn submit-btn orange-button" type="submit">
            submit
          </button>
          <p className="isMember">
            {user.isMember ? "Not a member yet?" : "Already a member?"}
            <button
              className="btn toggle-btn orange-button"
              type="button"
              onClick={toggleMember}
            >
              {user.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
        <Blob />
        <div className="spacer layer1"></div>
      </div>
    </StyledRegister>
  );
}

export default Register;
