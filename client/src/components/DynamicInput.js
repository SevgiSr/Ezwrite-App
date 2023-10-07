import { useEffect, useRef } from "react";
import StyledDynamicInput from "./styles/DynamicInput.styled";

function DynamicInput({
  isOpen,
  setIsOpen,
  value,
  setValue,
  handleChange,
  className,
  formRef,
}) {
  const inputRef = useRef(null);
  const isOpenRef = useRef(isOpen);

  // Update isOpenRef whenever isOpen changes
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const listener = (e) => {
    if (e.target !== inputRef.current && !formRef.current.contains(e.target)) {
      setValue("");
      setIsOpen(false);
      isOpenRef.current = false;
    }
  };

  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <StyledDynamicInput>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className={className}
      />
    </StyledDynamicInput>
  );
}

export default DynamicInput;
