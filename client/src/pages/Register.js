import { useState, useContext, useEffect } from "react";
import { FormRow } from "../components";
import { AppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialUser = {
  name: "",
  password: "",
  isMember: true,
};

function Register() {
  const navigate = useNavigate();

  const { registerUser, loginUser } = useContext(AppContext);
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
    if (localStorage.getItem("user")) {
      setTimeout(() => {
        navigate("/writing");
      }, 3000);
    }
  }, [user]);

  return (
    <div className="container">
      <h3>{user.isMember ? "Login" : "Register"}</h3>
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
        <button type="submit">submit</button>
        <p>
          {user.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember}>
            {user.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
