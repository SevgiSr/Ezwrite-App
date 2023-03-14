import { useEffect, useRef, useState } from "react";
import StyledDropdownMenu from "./styles/DropdownMenu.styled";

function DropdownMenu(props) {
  const [show, setShow] = useState(""); // Initialize as an object
  const stateRef = useRef(show);

  const setShowState = (state) => {
    stateRef.current = state;
    setShow(state);
  };

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const listener = (e) => {
    if (e.target !== buttonRef.current && e.target !== menuRef.current) {
      setShowState("");
    } else if (e.target === buttonRef.current) {
      let value;
      if (stateRef.current === "") {
        value = "show";
      } else {
        value = "";
      }

      setShowState(value);
    }
  };

  useEffect(() => {
    console.log("Adding event listener for dropdown menu with id:", props.id);
    window.addEventListener("click", listener);
    return () => {
      console.log(
        "Removing event listener for dropdown menu with id:",
        props.id
      );
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <StyledDropdownMenu>
      <button
        ref={buttonRef}
        name="drop"
        className={`dropdown-toggle ` + props.buttonClass}
      >
        {props.button}
      </button>
      <div ref={menuRef} className={"dropdown-menu-parent" + show}>
        <div className="dropdown-menu">
          <div className="dropdown-items">{props.menu}</div>
        </div>
      </div>
    </StyledDropdownMenu>
  );
}

export default DropdownMenu;
