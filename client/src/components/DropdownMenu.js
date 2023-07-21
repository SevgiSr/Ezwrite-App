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
    if (e.target !== buttonRef.current && !menuRef.current.contains(e.target)) {
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
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  return (
    <StyledDropdownMenu>
      <button
        ref={buttonRef}
        name="drop"
        className={`dropdown-toggle ` + props.buttonClass}
        type="button"
      >
        {props.button}
      </button>
      <div ref={menuRef} className={"dropdown-menu-parent " + show}>
        <div className={"dropdown-menu " + props.menuClass}>
          <div className="dropdown-items">{props.menu}</div>
          <div className="extra">{props.extra}</div>
        </div>
      </div>
    </StyledDropdownMenu>
  );
}

export default DropdownMenu;
