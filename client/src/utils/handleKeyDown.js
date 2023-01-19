import { AppContext } from "../context/appContext";
import { useContext } from "react";

export const handleKeyDown = (e, reducerState) => {
  // Reset field height
  e.target.style.height = "inherit";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(e.target);

  // Calculate the height
  const height =
    parseInt(computed.getPropertyValue("border-top-width"), 10) +
    parseInt(computed.getPropertyValue("padding-top"), 10) +
    e.target.scrollHeight +
    parseInt(computed.getPropertyValue("padding-bottom"), 10) +
    parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  e.target.style.height = `${height}px`;
};
