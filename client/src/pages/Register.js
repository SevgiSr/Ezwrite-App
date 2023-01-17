import { useState, useContext, useEffect } from "react";
import { FormRow, Alert } from "../components";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import "../assets/Register.css";

const initialUser = {
  name: "",
  password: "",
  isMember: true,
};

function Register() {
  const navigate = useNavigate();

  const { registerUser, loginUser, reducerState } = useContext(AppContext);
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
    if (!password || !name) {
      console.log("provide all values bitch");
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
    if (reducerState.user) {
      setTimeout(() => {
        navigate("/writing");
      }, 1000);
    }
  }, [reducerState.user, navigate]);

  return (
    <div className="container">
      <h3>{user.isMember ? "Login" : "Register"}</h3>
      {reducerState.showAlert && <Alert />}
      <form className="form" onSubmit={onSubmit}>
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
        <button className="btn submit-btn " type="submit">
          submit
        </button>
        <p>
          {user.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            className="btn toggle-btn"
            type="button"
            onClick={toggleMember}
          >
            {user.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
