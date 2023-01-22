import { useContext } from "react";
import { AppContext } from "../../../context/appContext";

function About() {
  const { reducerState } = useContext(AppContext);
  return (
    <div id="about">
      <h1>about</h1>
    </div>
  );
}

export default About;
